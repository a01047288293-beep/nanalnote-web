// 나날노트 — 보험사 대표번호 목록 (홈페이지·앱·지도에서 함께 씀)
// 확인: 2026-11-25. 우리은행 제휴보험사 안내, 보험연구원 손보사 연락처, 각 사 공식 앱·KB금융 안내.
// 번호가 바뀌면 이 파일 하나만 고치면 됩니다. 보험사가 보증·후원한 목록이 아닙니다.
(function (root) {
  "use strict";
  // t: 생명 | 손해 | 공제, s: 만 65세 이상 전용 상담 번호(있는 곳만)
  // k: 이 말이 들어 있으면 이 회사로 봄(띄어쓰기 무시), b: 회사 이름 없이 브랜드만 말했을 때 함께 보여 줄 묶음
  const LIST = [
    { n: "삼성생명", t: "생명", tel: "1588-3114", web: "https://www.samsunglife.com", k: ["삼성생명"], b: "삼성" },
    { n: "한화생명", t: "생명", tel: "1577-6301", web: "https://www.hanwhalife.com", k: ["한화생명", "대한생명"], b: "한화" },
    { n: "교보생명", t: "생명", tel: "1588-1099", web: "https://www.kyobo.com", k: ["교보생명"], b: "교보" },
    { n: "신한라이프", t: "생명", tel: "1588-5580", web: "https://www.shinhanlife.co.kr", k: ["신한라이프", "신한생명", "오렌지라이프", "ING생명"], b: "신한" },
    { n: "NH농협생명", t: "생명", tel: "1544-4000", web: "https://www.nhlife.co.kr", k: ["농협생명", "NH생명", "NH농협생명"], b: "농협" },
    { n: "KB라이프생명", t: "생명", tel: "1588-3374", s: "1599-3374", web: "https://www.kblife.co.kr", k: ["KB라이프", "KB생명", "국민생명", "푸르덴셜"], b: "KB" },
    { n: "미래에셋생명", t: "생명", tel: "1588-0220", web: "https://life.miraeasset.com", k: ["미래에셋"], b: "미래에셋" },
    { n: "동양생명", t: "생명", tel: "1577-1004", web: "https://www.myangel.co.kr", k: ["동양생명"], b: "동양" },
    { n: "ABL생명", t: "생명", tel: "1588-6500", web: "https://www.abllife.co.kr", k: ["ABL", "에이비엘", "알리안츠"] },
    { n: "흥국생명", t: "생명", tel: "1588-2286", web: "https://www.heungkuklife.co.kr", k: ["흥국생명"], b: "흥국" },
    { n: "DB생명", t: "생명", tel: "1588-3131", s: "1566-5909", web: "https://www.idblife.com", k: ["DB생명", "디비생명", "동부생명"], b: "DB" },
    { n: "AIA생명", t: "생명", tel: "1588-9898", web: "https://www.aia.co.kr", k: ["AIA", "에이아이에이"] },
    { n: "메트라이프생명", t: "생명", tel: "1588-9600", web: "https://www.metlife.co.kr", k: ["메트라이프", "메트라이프생명", "MetLife"] },
    { n: "라이나생명", t: "생명", tel: "1588-0058", web: "https://www.lina.co.kr", k: ["라이나생명"], b: "라이나" },
    { n: "처브라이프생명", t: "생명", tel: "1599-4600", web: "https://www.chubblife.co.kr", k: ["처브라이프", "에이스생명"], b: "처브" },
    { n: "KDB생명", t: "생명", tel: "1588-4040", web: "https://www.kdblife.co.kr", k: ["KDB", "산은생명", "금호생명"] },
    { n: "푸본현대생명", t: "생명", tel: "1577-3311", web: "https://www.fubonhyundai.com", k: ["푸본", "현대라이프", "현대생명", "녹십자생명"], b: "현대" },
    { n: "iM라이프", t: "생명", tel: "1588-4770", web: "https://www.imlifeins.co.kr", k: ["iM라이프", "아이엠라이프", "DGB생명", "우리아비바"] },
    { n: "하나생명", t: "생명", tel: "1577-1112", web: "https://www.hanalife.co.kr", k: ["하나생명"] },
    { n: "IBK연금보험", t: "생명", tel: "1577-4117", web: "https://www.ibki.co.kr", k: ["IBK", "기업은행보험"] },
    { n: "BNP파리바카디프생명", t: "생명", tel: "1688-1118", web: "https://www.cardif.co.kr", k: ["카디프", "BNP"] },
    { n: "교보라이프플래닛", t: "생명", tel: "1566-6930", web: "https://www.lifeplanet.co.kr", k: ["라이프플래닛"], b: "교보" },
    { n: "삼성화재", t: "손해", tel: "1588-5114", web: "https://www.samsungfire.com", k: ["삼성화재", "애니카"], b: "삼성" },
    { n: "현대해상", t: "손해", tel: "1588-5656", web: "https://www.hi.co.kr", k: ["현대해상", "하이카"], b: "현대" },
    { n: "DB손해보험", t: "손해", tel: "1588-0100", web: "https://www.idbins.com", k: ["DB손해", "DB손보", "디비손해", "동부화재", "프로미"], b: "DB" },
    { n: "KB손해보험", t: "손해", tel: "1544-0114", web: "https://www.kbinsure.co.kr", k: ["KB손해", "KB손보", "LIG", "엘아이지", "LG화재"], b: "KB" },
    { n: "메리츠화재", t: "손해", tel: "1566-7711", web: "https://www.meritzfire.com", k: ["메리츠", "동양화재"] },
    { n: "한화손해보험", t: "손해", tel: "1566-8000", web: "https://www.hwgeneralins.com", k: ["한화손해", "한화손보", "신동아화재", "캐롯"], b: "한화" },
    { n: "롯데손해보험", t: "손해", tel: "1588-3344", web: "https://www.lotteins.co.kr", k: ["롯데손해", "롯데손보", "롯데보험", "대한화재"], b: "롯데" },
    { n: "흥국화재", t: "손해", tel: "1688-1688", web: "https://www.heungkukfire.co.kr", k: ["흥국화재", "쌍용화재"], b: "흥국" },
    { n: "NH농협손해보험", t: "손해", tel: "1644-9000", web: "https://www.nhfire.co.kr", k: ["농협손해", "농협손보", "NH손해", "농협화재"], b: "농협" },
    { n: "AXA손해보험", t: "손해", tel: "1566-1566", web: "https://www.axa.co.kr", k: ["AXA", "악사", "교보자동차보험"] },
    { n: "하나손해보험", t: "손해", tel: "1566-3000", web: "https://www.hanainsure.co.kr", k: ["하나손해", "하나손보", "더케이손해"] },
    { n: "라이나손해보험(처브)", t: "손해", tel: "1566-5800", web: "https://www.chubb.com/kr-kr/", k: ["라이나손해", "처브손해", "에이스손해", "ACE"], b: "라이나" },
    { n: "예별손해보험 (옛 MG손해보험)", t: "손해", tel: "", web: "https://www.yebyeol.co.kr", k: ["예별", "MG손해", "MG손보", "그린화재"], note: "2025년 MG손해보험 계약을 넘겨받은 곳이에요. 번호는 홈페이지에서 확인해 주세요." },
    { n: "우체국보험", t: "공제", tel: "1599-0100", web: "https://www.epostbank.go.kr", k: ["우체국"] },
    { n: "MG새마을금고 공제", t: "공제", tel: "1599-9010", web: "https://www.kfcc.co.kr", k: ["새마을금고", "새마을"] },
  ];
  // 어느 회사인지 모를 때 (가족용)
  const UNKNOWN = [
    { n: "내보험찾아줌", d: "살아 계실 때 본인 명의 보험을 한 번에 조회", web: "https://cont.insure.or.kr" },
    { n: "안심상속 원스톱 서비스", d: "돌아가신 뒤 사망신고 때 함께 신청 — 보험·예금·연금을 한 번에 조회", web: "https://www.gov.kr" },
    { n: "금융감독원 상속인 금융거래 조회", d: "돌아가신 분의 보험·예금 계약을 상속인이 조회", web: "https://fine.fss.or.kr", tel: "1332" },
  ];
  const norm = s => String(s || "").replace(/\s+/g, "").toUpperCase();
  // 문장에서 보험사 찾기: 정확한 이름이 있으면 그 회사, 브랜드만 있으면(예: "삼성") 그 브랜드의 회사 모두
  function find(text) {
    const t = norm(text);
    if (!t) return [];
    const hit = new Set();
    let rest = t; // 정확히 찾은 이름은 지우고 남은 말에서 브랜드를 찾음 (예: "동양화재"가 동양생명으로 잡히지 않게)
    LIST.forEach((x, i) => { x.k.forEach(k => { const nk = norm(k); if (t.includes(nk)) { hit.add(i); rest = rest.split(nk).join(" "); } }); });
    const brandsDone = new Set([...hit].map(i => LIST[i].b).filter(Boolean));
    const BRAND = { 삼성: ["삼성"], 한화: ["한화"], 교보: ["교보"], 신한: ["신한"], 농협: ["농협", "NH"], KB: ["KB", "케이비"], 미래에셋: ["미래에셋"], 동양: ["동양"], 흥국: ["흥국"], DB: ["DB", "디비", "동부"], 라이나: ["라이나"], 처브: ["처브"], 현대: ["현대"], 롯데: ["롯데"] };
    Object.entries(BRAND).forEach(([b, words]) => {
      if (brandsDone.has(b) || !words.some(w => rest.includes(norm(w)))) return;
      LIST.forEach((x, i) => { if (x.b === b) hit.add(i); });
    });
    return [...hit].sort((a, b) => a - b).map(i => LIST[i]);
  }
  const telHref = n => "tel:" + String(n).replace(/[^0-9]/g, "");
  const api = { LIST, UNKNOWN, find, telHref, checked: "2026-11-25" };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.NANAL_INSURERS = api;
})(typeof window !== "undefined" ? window : globalThis);
