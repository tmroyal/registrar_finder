(async function(){
  const api_url = "http://127.0.0.1:5000";
  const WAIT_INTERVAL = 200;
  const domain_display = document.getElementById('domain');
  const registrar_display = document.getElementById('registrar');
  const loading_display = document.getElementById('loading');
  const registrar_url_display = 
    document.getElementById('registrar_url');
  
  let timeout;
  
  loading_display.style.visibility='hidden';
  
  function get_url(domain){
    return api_url +  '/domain?name=' + domain;
  }

  // this method is sloppy with types
  function set_display(disp, input){
    while (disp.firstChild) {
      disp.removeChild(disp.firstChild);
    }
  
    if (Array.isArray(input)){
      input.forEach((inp)=>{
        disp.appendChild(inp);
        disp.appendChild(
          document.createTextNode(' ')
        )
      })

    } else {
      const textNode = document.createTextNode(input);
      disp.appendChild(textNode);
    }
  }

  async function retrieve_domain_info(domain){
    loading_display.style.visibility='visible';
    const res = await fetch(get_url(domain), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    loading_display.style.visibility='hidden';

    if (res.ok){
      return await res.json();

    } else if (res.status == 404){
      return {
        message: {
          registrar: 'Not found',
          registrar_url: ''
        }
      }

    } else {
      return {
        message: {
          registrar: 'Invalid Url',
          registrar_url: ''
        }
      }
    }
  }

  function createLinks(urls){
    if (!Array.isArray(urls)){
      urls = [urls]
    }
  
    return urls.map((url)=>{
      const element = document.createElement('a');
      element.href = url;
      element.target = '_blank';
      const text = document.createTextNode(url);
      element.appendChild(text);
      return element;
    });
  }

  function sync_domains(domain){
    if (timeout){ clearTimeout(timeout); }
    timeout = setTimeout(async ()=>{
      if (domain){
        const domain_info = await retrieve_domain_info(domain);
        set_display(
          registrar_display, 
          domain_info.message.registrar || ''
        );
        set_display(
          registrar_url_display, 
          createLinks(domain_info.message.registrar_url) || ''
        );
      } else {
        set_display(registrar_display, ''); 
        set_display(registrar_url_display, ''); 
      }
    }, WAIT_INTERVAL);
  }

  document.getElementById('domain_entry').addEventListener(
    'keyup', 
    async function(e){ 
      let domain = e.target.value; 
      if (!domain.includes('.')){ domain = ''; }
      set_display(domain_display, domain || 'Enter Domain Name');
      sync_domains(domain);
    }
  );

})();