
/*
    Browser Info
*/
export default {
    getBrowser(projectType) {
        var u = navigator.userAgent;
        return {
          u: u,
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信
          qq: u.match(/\sQQ/i) == " qq", //是否QQ
          language:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
    },
    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    showNotification(showMessage) {
        //window.Notification.permission = "granted";
        //alert(window.Notification.permission);
        if(window.Notification) {
            if(window.Notification.permission == "granted") {
                var notification = new Notification('You have a new message', {
                    body: showMessage//,

                    //icon: "img/1.jpg"
                });
                setTimeout(function() { notification.close(); }, 5000);
            } else {
                window.Notification.requestPermission();
            }
        } else alert('Your browser does not support this message prompt function, please use the chrome kernel browser!');
    }
}