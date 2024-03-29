import { createPublicLambdaEvent, privateFunctionTest } from "./testUtil";
// import { handler as postMusician } from '../src/artist/post';
import { handler as getUser } from "../src/user/get";
import { handler as putUser } from "../src/user/put";
import { handler as getArtist } from "../src/artist/get";
import { handler as searchArtist } from "../src/artist/search/get";
import { handler as getCalendar } from "../src/calendar/get";
import { handler as getAccessToken } from "../src/token/access/get";
import { generateUserAccessToken } from "../src/lib/jwt";
import mysqlUtil from "../src/lib/mysqlUtil";

describe("MonthConcert test", () => {
  // test('POST artist', async () => {
  //   const parameters = { artistName: '볼빨간사춘기', instagramAccount: 'official_bol4' };
  //   const res = await postMusician(createPublicLambdaEvent(parameters));
  //   console.log('res', res);
  //   expect(res).toHaveProperty('statusCode', 200);
  // }, 1000000);

  test("GET user", async () => {
    const response = await privateFunctionTest(getUser, {});
    expect(response).toHaveProperty("statusCode", 200);
  });
  test("PUT user", async () => {
    const response = await privateFunctionTest(putUser, { profileImage: true });
    expect(response).toHaveProperty("statusCode", 200);
  });

  test("GET artist", async () => {
    const res = await privateFunctionTest(getArtist, { name: "볼" });
    expect(res).toHaveProperty("statusCode", 200);
  });

  test.only("GET artist search", async () => {
    const res = await privateFunctionTest(searchArtist, { name: "비" });
    expect(res).toHaveProperty("statusCode", 200);

    const res2 = await privateFunctionTest(searchArtist, { name: "윤아" });
    expect(res2).toHaveProperty("statusCode", 200);
  });

  test("GET calendar", async () => {
    const res = await privateFunctionTest(getCalendar, { year: 2024, month: 3 });
    expect(res).toHaveProperty("statusCode", 200);
  });

  test("GET access token", async () => {
    const refreshtoken = await generateUserAccessToken(3);
    await mysqlUtil.update("tb_user", { refresh_token: refreshtoken }, { idx: 3 });
    const parameters = { refreshToken: refreshtoken };
    const res = await getAccessToken(createPublicLambdaEvent(parameters));
    console.log("res", res);
    expect(res).toHaveProperty("statusCode", 200);
  });

});
