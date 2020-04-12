function showPlayerBox(a) {
  // 容器
  if (a.box) box = a.box
  clientWidth = document.body.clientWidth;
  var b = a.name ? a.name: "_v_p_" + Math.round(1E3 * Math.random()),
  c = a.width ? a.width: 600;
  if (600 >= clientWidth && isSafari) var c = parseInt(.9 * clientWidth),
  d = parseInt(c / 1.3333);
  else "string" == typeof c && -1 != c.indexOf("%") && isSafari ? isUC ? (c = getVideoWH(c), d = parseInt(c / 1.3333)) : d = "auto": d = a.height ? a.height: 497.5;
  _replay = a.replay;
  _objName = b;
  a.cdn = "100,0,0,0";
  a.sl = "5";
  objname = b;
  if (isSafari) {
    safariObj.w = c;
    safariObj.h = d;
    safariObj.name = b;
    safariObj.ap = a.autoplay;
    safariObj.fullscreen = a.fullscreen;
    safariObj.ori = a.ori;
    if (null == safariObj.ap || void 0 == safariObj.ap) safariObj.ap = !0;
    safariObj.toid = a.showid;
    safariObj.xml = a.id;
    safariObj.xml || (safariObj.xml = a.xml);
    safariObj.xml ? $.getScript('http://tvplayer.people.com.cn/getXML.php?path=' + safariObj.xml + "&callback=playForMobile&ios=" + isIOS + "&ori=" + safariObj.ori,function(){}) : (isHTTPError = !0, showVideoCodeInPage())
  } else {
    var e = [],
    f;
    for (f in a) e.push(f + "=" + _$_getTransStr(a[f]));
    isMaxthon() && e.push("ism=1");
    e.push("key=" + _$_getPageKey());
    e = e.join("&");
    1 == a.fullscreen && (d = c = "100%");
    a = 2 == a.skin ? "http://tv.people.com.cn/img/2011ptv2/playerByOsmfnb.swf" + (isMaxthon() ? "?" + Math.random() : "") : "http://tv.people.com.cn/img/2011ptv2/playerByOsmf.swf" + (isMaxthon() ? "?" + Math.random() : "");
    box.innerHTML ='<object id="' + b + '" name="' + b + '" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,1,85,3" width="' + c + '" height="' + d + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ><param name="movie" value="' + a + '" /><param name="FlashVars" value="' + e + '" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed name="' + b + '" width="' + c + '" height="' + d + '" src="' + a + '" wmode="opaque" allowFullScreen="true" allowScriptAccess="always" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" FlashVars="' + e + '" type="application/x-shockwave-flash"></embed></object>'
  }
}