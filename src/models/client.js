!(function (e, n) { typeof define === 'function' && (define.amd || define.cmd) ? define(() => { return n(e); }) : n(e, !0); }(this, (e, n) => {
  function i(n, i, t) { e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), (e) => { c(n, e, t); }) : u(n, t); } function t(n, i, t) { e.WeixinJSBridge ? WeixinJSBridge.on(n, (e) => { t && t.trigger && t.trigger(e), c(n, e, i); }) : t ? u(n, t) : u(n, i); } function o(e) { return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = 'sha1', e.verifyTimestamp = `${C.timestamp}`, e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e; } function r(e) {
    return {
      timeStamp: `${e.timestamp}`, nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || 'SHA1',
    };
  } function a(e) { return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e; } function c(e, n, i) { e == 'openEnterpriseChat' && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail; let t = n.errMsg; t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || '', C.debug && !i.isInnerInvoke && alert(JSON.stringify(n)); const o = t.indexOf(':'); switch (t.substring(o + 1)) { case 'ok': i.success && i.success(n); break; case 'cancel': i.cancel && i.cancel(n); break; default: i.fail && i.fail(n); }i.complete && i.complete(n); } function s(e, n) {
    let i = e,
      t = v[i]; t && (i = t); let o = 'ok'; if (n) { const r = n.indexOf(':'); (o = n.substring(r + 1)) == 'confirm' && (o = 'ok'), o == 'failed' && (o = 'fail'), o.indexOf('failed_') != -1 && (o = o.substring(7)), o.indexOf('fail_') != -1 && (o = o.substring(5)), (o = (o = o.replace(/_/g, ' ')).toLowerCase()) != 'access denied' && o != 'no permission to execute' || (o = 'permission denied'), i == 'config' && o == 'function not exist' && (o = 'ok'), o == '' && (o = 'fail'); } return n = `${i}:${o}`;
  } function d(e) {
    if (e) {
      for (let n = 0, i = e.length; n < i; ++n) {
        let t = e[n],
          o = h[t]; o && (e[n] = o);
      } return e;
    }
  } function u(e, n) { if (!(!C.debug || n && n.isInnerInvoke)) { const i = v[e]; i && (e = i), n && n._complete && delete n._complete, console.log(`"${e}",`, n || ''); } } function l(e) { if (!(w || T || C.debug || x < '6.0.2' || V.systemType < 0)) { const n = new Image(); V.appId = C.appId, V.initTime = A.initEndTime - A.initStartTime, V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime, N.getNetworkType({ isInnerInvoke: !0, success(e) { V.networkType = e.networkType; const i = `https://open.weixin.qq.com/sdk/report?v=${V.version}&o=${V.isPreVerifyOk}&s=${V.systemType}&c=${V.clientVersion}&a=${V.appId}&n=${V.networkType}&i=${V.initTime}&p=${V.preVerifyTime}&u=${V.url}`; n.src = i; } }); } } function p() { return (new Date()).getTime(); } function f(n) { k && (e.WeixinJSBridge ? I.__wxjsjs__isPreInject === 'preInject' ? I.addEventListener && I.addEventListener('WeixinJSBridgeReady', n, !1) : n() : I.addEventListener && I.addEventListener('WeixinJSBridgeReady', n, !1)); } function m() { N.invoke || (N.invoke = function (n, i, t) { e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t); }, N.on = function (n, i) { e.WeixinJSBridge && WeixinJSBridge.on(n, i); }); } function g(e) {
    if (typeof e === 'string' && e.length > 0) {
      let n = e.split('?')[0],
        i = e.split('?')[1]; return n += '.html', void 0 !== i ? `${n}?${i}` : n;
    }
  } if (!e.jWeixin) {
    var h = {
        config: 'preVerifyJSAPI', onMenuShareTimeline: 'menu:share:timeline', onMenuShareAppMessage: 'menu:share:appmessage', onMenuShareQQ: 'menu:share:qq', onMenuShareWeibo: 'menu:share:weiboApp', onMenuShareQZone: 'menu:share:QZone', previewImage: 'imagePreview', getLocation: 'geoLocation', openProductSpecificView: 'openProductViewWithPid', addCard: 'batchAddCard', openCard: 'batchViewCard', chooseWXPay: 'getBrandWCPayRequest', openEnterpriseRedPacket: 'getRecevieBizHongBaoRequest', startSearchBeacons: 'startMonitoringBeacons', stopSearchBeacons: 'stopMonitoringBeacons', onSearchBeacons: 'onBeaconsInRange', consumeAndShareCard: 'consumedShareCard', openAddress: 'editAddress',
      },
      v = (function () { const e = {}; for (const n in h)e[h[n]] = n; return e; }()),
      I = e.document,
      S = I.title,
      y = navigator.userAgent.toLowerCase(),
      _ = navigator.platform.toLowerCase(),
      w = !(!_.match('mac') && !_.match('win')),
      T = y.indexOf('wxdebugger') != -1,
      k = y.indexOf('micromessenger') != -1,
      M = y.indexOf('android') != -1,
      P = y.indexOf('iphone') != -1 || y.indexOf('ipad') != -1,
      x = (function () { const e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/); return e ? e[1] : ''; }()),
      A = {
        initStartTime: p(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0,
      },
      V = {
        version: 1, appId: '', initTime: 0, preVerifyTime: 0, networkType: '', isPreVerifyOk: 1, systemType: P ? 1 : M ? 2 : -1, clientVersion: x, url: encodeURIComponent(location.href),
      },
      C = {},
      L = { _completes: [] },
      B = { state: 0, data: {} }; f(() => { A.initEndTime = p(); }); var E = !1,
      O = [],
      N = {
        config(e) { C = e, u('config', e); const n = !1 !== C.check; f(() => { if (n)i(h.config, { verifyJsApiList: d(C.jsApiList) }, (function () { L._complete = function (e) { A.preVerifyEndTime = p(), B.state = 1, B.data = e; }, L.success = function (e) { V.isPreVerifyOk = 0; }, L.fail = function (e) { L._fail ? L._fail(e) : B.state = -1; }; const e = L._completes; return e.push(() => { l(); }), L.complete = function (n) { for (let i = 0, t = e.length; i < t; ++i)e[i](); L._completes = []; }, L; }())), A.preVerifyStartTime = p(); else { B.state = 1; for (let e = L._completes, t = 0, o = e.length; t < o; ++t)e[t](); L._completes = []; } }), m(); },
        ready(e) { B.state != 0 ? e() : (L._completes.push(e), !k && C.debug && e()); },
        error(e) { x < '6.0.2' || (B.state == -1 ? e(B.data) : L._fail = e); },
        checkJsApi(e) { const n = function (e) { const n = e.checkResult; for (const i in n) { const t = v[i]; t && (n[t] = n[i], delete n[i]); } return e; }; i('checkJsApi', { jsApiList: d(e.jsApiList) }, (e._complete = function (e) { if (M) { const i = e.checkResult; i && (e.checkResult = JSON.parse(i)); }e = n(e); }, e)); },
        onMenuShareTimeline(e) {
          t(h.onMenuShareTimeline, {
            complete() {
              i('shareTimeline', {
                title: e.title || S, desc: e.title || S, img_url: e.imgUrl || '', link: e.link || location.href, type: e.type || 'link', data_url: e.dataUrl || '',
              }, e);
            },
          }, e);
        },
        onMenuShareAppMessage(e) {
          t(h.onMenuShareAppMessage, {
            complete(n) {
              n.scene === 'favorite' ? i('sendAppMessage', {
                title: e.title || S, desc: e.desc || '', link: e.link || location.href, img_url: e.imgUrl || '', type: e.type || 'link', data_url: e.dataUrl || '',
              }) : i('sendAppMessage', {
                title: e.title || S, desc: e.desc || '', link: e.link || location.href, img_url: e.imgUrl || '', type: e.type || 'link', data_url: e.dataUrl || '',
              }, e);
            },
          }, e);
        },
        onMenuShareQQ(e) {
          t(h.onMenuShareQQ, {
            complete() {
              i('shareQQ', {
                title: e.title || S, desc: e.desc || '', img_url: e.imgUrl || '', link: e.link || location.href,
              }, e);
            },
          }, e);
        },
        onMenuShareWeibo(e) {
          t(h.onMenuShareWeibo, {
            complete() {
              i('shareWeiboApp', {
                title: e.title || S, desc: e.desc || '', img_url: e.imgUrl || '', link: e.link || location.href,
              }, e);
            },
          }, e);
        },
        onMenuShareQZone(e) {
          t(h.onMenuShareQZone, {
            complete() {
              i('shareQZone', {
                title: e.title || S, desc: e.desc || '', img_url: e.imgUrl || '', link: e.link || location.href,
              }, e);
            },
          }, e);
        },
        startRecord(e) { i('startRecord', {}, e); },
        stopRecord(e) { i('stopRecord', {}, e); },
        onVoiceRecordEnd(e) { t('onVoiceRecordEnd', e); },
        playVoice(e) { i('playVoice', { localId: e.localId }, e); },
        pauseVoice(e) { i('pauseVoice', { localId: e.localId }, e); },
        stopVoice(e) { i('stopVoice', { localId: e.localId }, e); },
        onVoicePlayEnd(e) { t('onVoicePlayEnd', e); },
        uploadVoice(e) { i('uploadVoice', { localId: e.localId, isShowProgressTips: e.isShowProgressTips == 0 ? 0 : 1 }, e); },
        downloadVoice(e) { i('downloadVoice', { serverId: e.serverId, isShowProgressTips: e.isShowProgressTips == 0 ? 0 : 1 }, e); },
        translateVoice(e) { i('translateVoice', { localId: e.localId, isShowProgressTips: e.isShowProgressTips == 0 ? 0 : 1 }, e); },
        chooseImage(e) {
          i('chooseImage', {
            scene: '1|2', count: e.count || 9, sizeType: e.sizeType || ['original', 'compressed'], sourceType: e.sourceType || ['album', 'camera'],
          }, (e._complete = function (e) { if (M) { const n = e.localIds; n && (e.localIds = JSON.parse(n)); } }, e));
        },
        getLocation(e) {},
        previewImage(e) { i(h.previewImage, { current: e.current, urls: e.urls }, e); },
        uploadImage(e) { i('uploadImage', { localId: e.localId, isShowProgressTips: e.isShowProgressTips == 0 ? 0 : 1 }, e); },
        downloadImage(e) { i('downloadImage', { serverId: e.serverId, isShowProgressTips: e.isShowProgressTips == 0 ? 0 : 1 }, e); },
        getLocalImgData(e) { !1 === E ? (E = !0, i('getLocalImgData', { localId: e.localId }, (e._complete = function (e) { if (E = !1, O.length > 0) { const n = O.shift(); wx.getLocalImgData(n); } }, e))) : O.push(e); },
        getNetworkType(e) {
          const n = function (e) {
            const n = e.errMsg; e.errMsg = 'getNetworkType:ok'; const i = e.subtype; if (delete e.subtype, i)e.networkType = i; else {
              let t = n.indexOf(':'),
                o = n.substring(t + 1); switch (o) { case 'wifi': case 'edge': case 'wwan': e.networkType = o; break; default: e.errMsg = 'getNetworkType:fail'; }
            } return e;
          }; i('getNetworkType', {}, (e._complete = function (e) { e = n(e); }, e));
        },
        openLocation(e) {
          i('openLocation', {
            latitude: e.latitude, longitude: e.longitude, name: e.name || '', address: e.address || '', scale: e.scale || 28, infoUrl: e.infoUrl || '',
          }, e);
        },
        getLocation(e) { e = e || {}, i(h.getLocation, { type: e.type || 'wgs84' }, (e._complete = function (e) { delete e.type; }, e)); },
        hideOptionMenu(e) { i('hideOptionMenu', {}, e); },
        showOptionMenu(e) { i('showOptionMenu', {}, e); },
        closeWindow(e) { i('closeWindow', {}, e = e || {}); },
        hideMenuItems(e) { i('hideMenuItems', { menuList: e.menuList }, e); },
        showMenuItems(e) { i('showMenuItems', { menuList: e.menuList }, e); },
        hideAllNonBaseMenuItem(e) { i('hideAllNonBaseMenuItem', {}, e); },
        showAllNonBaseMenuItem(e) { i('showAllNonBaseMenuItem', {}, e); },
        scanQRCode(e) { i('scanQRCode', { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ['qrCode', 'barCode'] }, (e._complete = function (e) { if (P) { const n = e.resultStr; if (n) { const i = JSON.parse(n); e.resultStr = i && i.scan_code && i.scan_code.scan_result; } } }, e)); },
        openAddress(e) { i(h.openAddress, {}, (e._complete = function (e) { e = a(e); }, e)); },
        openProductSpecificView(e) { i(h.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e); },
        addCard(e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            let a = n[o],
              c = { card_id: a.cardId, card_ext: a.cardExt }; t.push(c);
          }i(h.addCard, { card_list: t }, (e._complete = function (e) { let n = e.card_list; if (n) { for (let i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) { const o = n[i]; o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ; }e.cardList = n, delete e.card_list; } }, e));
        },
        chooseCard(e) {
          i('chooseCard', {
            app_id: C.appId, location_id: e.shopId || '', sign_type: e.signType || 'SHA1', card_id: e.cardId || '', card_type: e.cardType || '', card_sign: e.cardSign, time_stamp: `${e.timestamp}`, nonce_str: e.nonceStr,
          }, (e._complete = function (e) { e.cardList = e.choose_card_info, delete e.choose_card_info; }, e));
        },
        openCard(e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            let a = n[o],
              c = { card_id: a.cardId, code: a.code }; t.push(c);
          }i(h.openCard, { card_list: t }, e);
        },
        consumeAndShareCard(e) { i(h.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e); },
        chooseWXPay(e) { i(h.chooseWXPay, r(e), e); },
        openEnterpriseRedPacket(e) { i(h.openEnterpriseRedPacket, r(e), e); },
        startSearchBeacons(e) { i(h.startSearchBeacons, { ticket: e.ticket }, e); },
        stopSearchBeacons(e) { i(h.stopSearchBeacons, {}, e); },
        onSearchBeacons(e) { t(h.onSearchBeacons, e); },
        openEnterpriseChat(e) { i('openEnterpriseChat', { useridlist: e.userIds, chatname: e.groupName }, e); },
        launchMiniProgram(e) { i('launchMiniProgram', { targetAppId: e.targetAppId, path: g(e.path), envVersion: e.envVersion }, e); },
        miniProgram: {
          navigateBack(e) { e = e || {}, f(() => { i('invokeMiniProgramAPI', { name: 'navigateBack', arg: { delta: e.delta || 1 } }, e); }); }, navigateTo(e) { f(() => { i('invokeMiniProgramAPI', { name: 'navigateTo', arg: { url: e.url } }, e); }); }, redirectTo(e) { f(() => { i('invokeMiniProgramAPI', { name: 'redirectTo', arg: { url: e.url } }, e); }); }, switchTab(e) { f(() => { i('invokeMiniProgramAPI', { name: 'switchTab', arg: { url: e.url } }, e); }); }, reLaunch(e) { f(() => { i('invokeMiniProgramAPI', { name: 'reLaunch', arg: { url: e.url } }, e); }); }, postMessage(e) { f(() => { i('invokeMiniProgramAPI', { name: 'postMessage', arg: e.data || {} }, e); }); }, getEnv(n) { f(() => { n({ miniprogram: e.__wxjs_environment === 'miniprogram' }); }); },
        },
      },
      b = 1,
      R = {}; return I.addEventListener('error', (e) => {
      if (!M) {
        let n = e.target,
          i = n.tagName,
          t = n.src; if ((i == 'IMG' || i == 'VIDEO' || i == 'AUDIO' || i == 'SOURCE') && t.indexOf('wxlocalresource://') != -1) { e.preventDefault(), e.stopPropagation(); let o = n['wx-id']; if (o || (o = b++, n['wx-id'] = o), R[o]) return; R[o] = !0, wx.ready(() => { wx.getLocalImgData({ localId: t, success(e) { n.src = e.localData; } }); }); }
      }
    }, !0), I.addEventListener('load', (e) => {
      if (!M) {
        let n = e.target,
          i = n.tagName; n.src; if (i == 'IMG' || i == 'VIDEO' || i == 'AUDIO' || i == 'SOURCE') { const t = n['wx-id']; t && (R[t] = !1); }
      }
    }, !0), n && (e.wx = e.jWeixin = N), N;
  }
}));
