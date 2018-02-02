const template = (head, html, preloadedState, env) => {
  const fullPage = `
    <!DOCTYPE html>
    <html>
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-113408953-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-113408953-1');
        </script>
        <!-- End Google Tag Manager -->

        <!-- TODO: titleはページ毎に変えたい -->
        <link rel="icon" href="/images/logo/icon.ico" type="image/vnd.microsoft.icon">
        <title>Artie | アーティ</title>

        <!-- Import webfonts -->
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/dist/style.css" type="text/css">
        <script type="text/javascript" async defer src="//platform.twitter.com/widgets.js"></script>
        <meta name="viewport" content="width=device-width,user-scalable=0,initial-scale=1">

        <script>
          (function() {
            if (${JSON.stringify(env)} !== 'production') {
              var comment = document.createComment("noindex tag");
              var meta = document.createElement('meta');
              meta.name = 'robots'
              meta.content = 'noindex';
              var head = document.head;
              head.appendChild(comment);
              head.appendChild(meta);
            }
          }())
        </script>

        <!-- Install typekit from typekit.com/fonts/proxima-nova. -->
        <script>
          (function(d) {
            var config = {
              kitId: 'tac0wli',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        </script>

        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
      </head>
      <body>
        <!-- Google Tag Manager (noscript) -->
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PK99WB"
            height="0" width="0" style="display:none;visibility:hidden">
          </iframe>
        </noscript>
        <!-- End Google Tag Manager (noscript) -->

        <!-- Google Analytics -->
        <script>
          // (function(i,s,o,g,r,a,m){
          //   i['GoogleAnalyticsObject']=r;
          //   i[r]=i[r]||function(){
          //     (i[r].q=i[r].q||[]).push(arguments)},
          //     i[r].l=1*new Date();
          //     a=s.createElement(o),
          //     m=s.getElementsByTagName(o)[0];
          //     a.async=1;
          //     a.src=g;
          //     m.parentNode.insertBefore(a,m)
          //   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          //
          // ga('create', 'UA-83692651-1', 'auto');
        </script>
        <!-- End Google Analytics -->

        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
      </body>
      <script src="/dist/client.js"></script>
    </html>
  `;
  return fullPage;
};

export default template;
