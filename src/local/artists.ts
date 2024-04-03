import "./set-env";

import { getArtistsProfiles } from "../lib/crawling";
import mysqlUtil from "../lib/mysqlUtil";

const ARTISTS_NAMES = [
  "방탄소년단",
  "아이유",
  "조용필",
  "TWICE",
  "소녀시대",
  "EXO",
  "신승훈",
  "BIGBANG",
  "서태지와 아이들",
  "김건모",
  "임창정",
  "god(아이돌)",
  "터보(그룹)",
  "Red Velvet",
  "신화(아이돌)",
  "유승준",
  "H.O.T.",
  "싸이",
  "쿨(혼성그룹)",
  "SUPER JUNIOR",
  "SHINee",
  "김민종",
  "BLACKPINK",
  "젝스키스",
  "IVE",
  "룰라",
  "김원준",
  "동방신기",
  "S.E.S.",
  "비스트(아이돌)",
  "(여자)아이들",
  "핑클",
  "DJ DOC",
  "이선희",
  "여자친구(아이돌)",
  "원더걸스",
  "세븐틴",
  "씨스타",
  "2NE1",
  "태연",
  "ITZY",
  "Apink",
  "조성모",
  "보아",
  "김정민(1968)",
  "Wanna One",
  "민해경",
  "김종국",
  "NewJeans",
  "인피니트(아이돌)",
  "이효리",
  "노이즈(가수)",
  "이현우(가수)",
  "김현정",
  "박미경",
  "NCT 127",
  "백지영",
  "G-DRAGON",
  "NCT DREAM",
  "CNBLUE",
  "테이",
  "클론(가수)",
  "f(x)",
  "마마무",
  "015B",
  "이수영(가수)",
  "SE7EN",
  "코요태",
  "장나라",
  "양파(가수)",
  "GOT7",
  "티아라(아이돌)",
  "다비치",
  "카라",
  "더보이즈",
  "LE SSERAFIM",
  "iKON",
  "SG워너비",
  "S#ARP",
  "박진영",
  "지코",
  "김종서",
  "aespa",
  "이무송",
  "노사연",
  "쥬얼리",
  "태양(BIGBANG)",
  "WINNER",
  "AKMU",
  "언타이틀",
  "엄정화",
  "Stray Kids",
  "지누션",
  "김흥국",
  "이은하",
  "이정현(멀티 엔터테이너)",
  "투투(가수)",
  "강다니엘",
  "버즈(한국 밴드)",
  "선미",
  "소녀시대-태티서",
  "김완선",
  "VIXX",
  "뉴이스트",
  "SS501(아이돌)",
  "브라운아이드걸스",
  "UP",
  "임영웅",
  "ATEEZ",
  "녹색지대",
  "소유(가수)",
  "정기고",
  "B1A4",
  "청하",
  "영턱스클럽",
  "정국(방탄소년단)",
  "홍경민",
  "틴탑",
  "하이라이트(아이돌)",
  "미스터 투",
  "미쓰에이",
  "화사(마마무)",
  "EXO-K",
  "EXID",
  "볼빨간사춘기",
  "4minute",
  "걸스데이",
  "ZAM",
  "NCT U",
  "ENHYPEN",
  "투모로우바이투게더",
  "백현",
  "STAYC",
  "태민",
  "IZ*ONE",
  "종현",
  "에픽하이",
  "윤하",
  "브레이브걸스",
  "마로니에(보컬 그룹)",
  "손담비",
  "김민교(가수)",
  "몬스타엑스",
  "에일리",
  "시크릿(아이돌)",
  "비투비",
  "구본승",
  "트러블 메이커(가수)",
  "수지(1994)",
  "백현",
  "베이비복스",
  "지수(BLACKPINK)",
  "UN(가수)",
  "아이비(가수)",
  "G.NA",
  "X1",
  "블락비",
  "오마이걸",
  "첸",
  "이무진",
  "나연",
  "케이윌",
  "부석순",
  "브라운 아이즈",
  "애프터스쿨",
  "씨스타19",
  "씨야",
  "뉴이스트 W",
  "제니(BLACKPINK)",
  "로이킴",
  "ASTRO",
  "김준선",
  "B.A.P",
  "수호(EXO)",
  "정용화",
  "아이오아이",
  "모모랜드",
  "송민호",
  "로제(BLACKPINK)",
  "김경호",
  "클릭비",
  "가인(브라운아이드걸스)",
  "조권",
  "EXO-SC",
  "GD X TAYANG",
  "싹쓰리",
  "샤크라",
  "양요섭",
  "SF9",
  "GOT the beat",
  "김우석(1996)",
  "Kep1er",
  "WSG 워너비",
  "지민",
  "뷔",
  "원어스",
  "AOA(아이돌)",
  "박지헌",
  "니엘",
  "효린",
  "규현",
  "민서",
  "프로미스나인",
  "카이(EXO)",
  "NCT 도재정",
  "NMIXX",
  "김장훈",
  "천상지희 더 그레이스",
  "GD&TOP",
  "소유(가수)",
  "매드클라운",
  "가인(브라운아이드걸스)",
  "정은지",
  "현아",
  "한동근",
  "라붐(아이돌)",
  "JBJ",
  "크레용팝",
  "디바(가수)",
  "엔플라잉",
  "박지훈",
  "레드벨벳-아이린&슬기",
  "디오(EXO)",
  "경서",
  "리사(BLACKPINK)",
  "KEY(SHINee)",
  "펜타곤(아이돌)",
  "TREASURE",
  "김민석",
  "VERIVERY",
  "첫사랑(아이돌)",
  "온유(SHINee)",
  "지효",
  "TEMPEST(아이돌)",
  "RIIZE",
  "EVNNE",
  "P1Harmony",
  "TWS(아이돌)",
  "Apink",
];

const getArtists = async () => {
  for (const artists_name of ARTISTS_NAMES) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const profiles = await getArtistsProfiles(artists_name);

    // 뮤지션 정보 저장
    console.log(profiles)
    const promises = profiles.map((profile) => {
      console.log("[profile]", profile);
      const upsertObject = {
        artist_name: artists_name.replaceAll(" ", ""),
        instagram_account: profile.instaAccount,
      };

      if (!profile.instaAccount) return;

      return mysqlUtil.upsert("tb_artist", upsertObject, { instagram_account: profile.instaAccount });
    });

    await Promise.all(promises);
  }
};

getArtists();