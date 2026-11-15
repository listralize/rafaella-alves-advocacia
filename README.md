# Rafaella Alves Advocacia — Cirurgia reparadora negada pelo plano

Landing page estática (HTML/CSS/JS, sem build) para captação de leads de Direito à Saúde (cirurgia reparadora pós-bariátrica / grande perda de peso).

- Formulário em etapas → abre o WhatsApp (62) 98445-5530 com "Olá! Meu nome é …" + resumo (gatilho do agente DealPass).
- Parâmetros `utm_source`/`utm_campaign` são incluídos no resumo.
- Publicidade conforme Provimento 205/2021 (sem preços, sem promessa de resultado, sem "consulta gratuita").
- Deploy: GitHub Pages (preview) ou Coolify via `Dockerfile` + `nginx.conf`.
- Pixel Meta / GA: ainda não instalados (o `app.js` dispara `fbq('track','Lead')`/`gtag` se existirem).
