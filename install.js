// 나날노트 설치 도우미 — 휴대폰 종류·카톡 같은 앱 안 브라우저·이미 설치됨을 알아내고, 설치 버튼을 준비함
(function (root) {
  "use strict";
  const ua = navigator.userAgent || "";
  const APP = "https://xn--910bqa26dz54h.com/app/";
  const inApp = /KAKAOTALK/i.test(ua) ? "카카오톡"
    : /NAVER\(inapp/i.test(ua) ? "네이버"
    : /DaumApps/i.test(ua) ? "다음"
    : /Instagram/i.test(ua) ? "인스타그램"
    : /FBAN|FBAV/i.test(ua) ? "페이스북"
    : /Line\//i.test(ua) ? "라인"
    : /BAND\//i.test(ua) ? "밴드" : "";
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  const os = ios ? "ios" : android ? "android" : "pc";
  let deferred = null; const waiters = [];
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; waiters.forEach(f => f()); });
  addEventListener("appinstalled", () => { deferred = null; try { localStorage.setItem("nanal-installed", "1"); } catch (_) {} });
  // 카톡 안에서 바깥 브라우저로 열기 (카톡은 전용 주소, 안드로이드 다른 앱은 크롬 intent)
  function openOutside(url) {
    url = url || APP;
    if (inApp === "카카오톡") { location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(url); return true; }
    if (android) { const u = new URL(url); location.href = "intent://" + u.host + u.pathname + u.search + "#Intent;scheme=https;package=com.android.chrome;end"; return true; }
    return false; // 아이폰의 다른 앱: 사람이 메뉴에서 'Safari로 열기'
  }
  async function prompt() { if (!deferred) return "none"; deferred.prompt(); const r = await deferred.userChoice.catch(() => null); deferred = null; return r && r.outcome === "accepted" ? "ok" : "no"; }
  async function copy(url) { url = url || APP; try { await navigator.clipboard.writeText(url); return true; } catch (_) { const t = document.createElement("textarea"); t.value = url; document.body.appendChild(t); t.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (_) {} t.remove(); return ok; } }
  root.NANAL_INSTALL = { inApp, os, ios, android, standalone, APP, openOutside, prompt, copy, canPrompt: () => !!deferred, onReady: f => { if (deferred) f(); else waiters.push(f); } };
})(window);
