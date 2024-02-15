import { createPublicLambdaEvent, privateFunctionTest } from './testUtil';
import { handler as postMusician } from '../src/artist/post';
import { handler as getUser } from '../src/user/get';
import { handler as putUser } from '../src/user/put';
import { handler as getArtist } from '../src/artist/get';
import { handler as getCalendar } from '../src/calendar/get';

describe('MonthConcert test', () => {
  test.only('POST artist', async () => {
    const parameters = { artistName: '볼빨간사춘기', instagramAccount: 'official_bol4' };
    const res = await postMusician(createPublicLambdaEvent(parameters));
    console.log('res', res);
    expect(res).toHaveProperty('statusCode', 200);
  }, 1000000);

  test('GET user', async () => {
    const response = await privateFunctionTest(getUser, {});
    expect(response).toHaveProperty('statusCode', 200);
  });
  test('PUT user', async () => {
    const response = await privateFunctionTest(putUser, { profileImage: true });
    expect(response).toHaveProperty('statusCode', 200);
  });

  test('GET artist', async () => {
    const res = await privateFunctionTest(getArtist, { name: '볼' });
    expect(res).toHaveProperty('statusCode', 200);
  });

  test('GET calendar', async () => {
    const res = await privateFunctionTest(getCalendar, { year: 2024, month: 2 });
    expect(res).toHaveProperty('statusCode', 200);
  });
});