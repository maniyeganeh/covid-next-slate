(function () {
  const now = new Date()
  const version = now.getFullYear().toString() + '0' + now.getMonth() + '0' + now.getDate() +
    '0' + now.getHours()
  const head = document.getElementsByTagName('head')[0]
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://app.najva.com/static/css/local-messaging.css' + '?v=' + version
  head.appendChild(link)
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = 'https://app.najva.com/static/js/scripts/dailystats-website-31892-d359fa05-a3eb-4575-a737-f2d25b88fd1f.js' + '?v=' + version
  head.appendChild(script)
})()
