import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { FromSchema } from 'json-schema-to-ts';
import mysqlUtil from '../../lib/mysqlUtil';
import { generateTokens } from '../../lib/jwt';
import { USER_REGISTER_TYPE } from '../../lib/constants/user';
import { verifyNaverToken } from '../../lib/loginUtil';

const parameter = {
  type: 'object',
  properties: {
    naverAccessToken: { type: 'string' }, // naver에서 발급한 access token
  },
  required: ['naverAccessToken'],
} as const;

export const handler = async (event: APIGatewayProxyEventV2) => {
  console.log('[event]', event);
  const { naverAccessToken } = JSON.parse(event.body) as FromSchema<typeof parameter>;

  try {
    // naver server에서 발급한 accss token 검증 및 payload 조회
    let userEmail: string, fullName: string;
    try {
      const { email, name } = await verifyNaverToken(naverAccessToken);
      userEmail = email;
      fullName = name;
    } catch (err) {
      console.log('[verifyNaverToken failed]', err);
      return { statusCode: 401, body: JSON.stringify({ code: 'Verification_Failed' }) };
    }

    let user = await mysqlUtil.getOne('tb_user', [], { user_email: userEmail });
    const processType = user ? 'signin' : 'signup';
    // 회원가입
    if (processType === 'signup') {
      await mysqlUtil.create('tb_user', {
        user_email: userEmail,
        user_name: fullName,
        register_type: USER_REGISTER_TYPE.NAVER,
        marketing_agreed: 1, // 가입시 마케팅 동의
      });
      user = await mysqlUtil.getOne('tb_user', [], { user_email: userEmail });
    }

    // 로그인
    await mysqlUtil.update('tb_user', { last_login_type: USER_REGISTER_TYPE.NAVER }, { idx: user.idx });
    await mysqlUtil.updateTimestamp('tb_user', 'last_login_date', { idx: user.idx });
    const { accessToken, refreshToken } = await generateTokens(event, user.idx);

    return { statusCode: 200, body: JSON.stringify({ processType, accessToken, refreshToken }) };
  } catch (err) {
    console.log('err', err);
    return { statusCode: 500, body: JSON.stringify({ code: 'Internal_Server_Error' }) };
  }
};
