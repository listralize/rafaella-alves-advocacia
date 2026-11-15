(function(){
  var WA='5562984455530';
  var f=document.getElementById('f'),steps=[].slice.call(f.querySelectorAll('.step')),bar=document.getElementById('bar'),
      back=document.getElementById('back'),next=document.getElementById('next'),err=document.getElementById('err'),i=0,ans={};
  var qs=new URLSearchParams(location.search);
  function visible(){return steps.filter(function(s){return !(s.dataset.k==='operadora'&&ans.plano&&ans.plano.indexOf('Não')===0)})}
  function show(n){var v=visible();i=Math.max(0,Math.min(n,v.length-1));steps.forEach(function(s){s.classList.remove('on')});var s=v[i];s.classList.add('on');
    bar.style.width=Math.round((i+1)/v.length*100)+'%';back.style.visibility=i?'visible':'hidden';next.style.display=s.hasAttribute('data-input')?'':'none';err.textContent='';
    var inp=s.querySelector('input[type=text]');if(inp&&i)setTimeout(function(){inp.focus()},50)}
  steps.forEach(function(s){[].forEach.call(s.querySelectorAll('.opt'),function(b){b.addEventListener('click',function(){
    [].forEach.call(s.querySelectorAll('.opt'),function(x){x.classList.remove('sel')});b.classList.add('sel');ans[s.dataset.k]=b.textContent.trim();setTimeout(function(){show(i+1)},180)})})});
  next.addEventListener('click',function(){var s=visible()[i],v=s.querySelector('input').value.trim();if(!v){err.textContent='Preencha para continuar.';return}ans[s.dataset.k]=v;show(i+1)});
  back.addEventListener('click',function(){show(i-1)});
  f.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName==='INPUT'&&!visible()[i].hasAttribute('data-final')){e.preventDefault();next.click()}});
  f.addEventListener('submit',function(e){e.preventDefault();
    var nome=document.getElementById('nome').value.trim(),cid=document.getElementById('cidade').value.trim();
    if(nome.length<2){err.textContent='Informe seu nome.';return}
    if(!document.getElementById('lgpd').checked){err.textContent='Marque a autorização para enviar suas informações.';return}
    var L=['Olá! Meu nome é '+nome+'.','Quero entender meu direito à cirurgia reparadora.','','Resumo das minhas respostas no site:',
      '• Plano de saúde: '+(ans.plano||'-')+(ans.operadora&&ans.plano&&ans.plano.indexOf('Sim')===0?' ('+ans.operadora+')':''),
      '• Perda de peso: '+(ans.caso||'-'),'• Cirurgia indicada: '+(ans.cirurgia||'-'),'• Resposta do plano: '+(ans.negativa||'-'),
      '• Laudo do cirurgião: '+(ans.laudo||'-'),'• Acompanhamento psicológico: '+(ans.psicologo||'-')];
    if(cid)L.push('• Cidade/UF: '+cid);
    var src=qs.get('utm_source');if(src)L.push('(origem: '+src+(qs.get('utm_campaign')?' / '+qs.get('utm_campaign'):'')+')');
    if(window.fbq)try{fbq('track','Lead')}catch(x){}
    if(window.gtag)try{gtag('event','generate_lead')}catch(x){}
    location.href='https://wa.me/'+WA+'?text='+encodeURIComponent(L.join('\n'))});
  document.getElementById('ano').textContent=new Date().getFullYear();
  show(0);
})();
