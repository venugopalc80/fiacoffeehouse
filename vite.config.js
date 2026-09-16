import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function repairHeaderNavigation() {
  return {
    name: 'repair-fia-header-navigation',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/main.jsx')) return null;

      let next = code;
      next = next.replace(
        "function Header({page,open,setOpen}){const go=p=>{setOpen(false);window.location.hash=slug(p)};",
        "function Header({page,open,setOpen,go}){const navigate=p=>{setOpen(false);go(p)};"
      );
      next = next.replace(
        '<Header page={page} open={open} setOpen={setOpen}/>',
        '<Header page={page} open={open} setOpen={setOpen} go={go}/>'
      );
      next = next.replace(
        'onClick={()=>go(\'Home\')}><span>FIA</span>',
        'onClick={()=>navigate(\'Home\')}><span>FIA</span>'
      );
      next = next.replace(
        'onClick={()=>go(p)}>{p}</button>)}<button className="nav-cta" onClick={()=>go(\'Book a Table\')}',
        'onClick={()=>navigate(p)}>{p}</button>)}<button className="nav-cta" onClick={()=>navigate(\'Book a Table\')}'
      );

      return next === code ? null : { code: next, map: null };
    }
  };
}

export default defineConfig({
  plugins: [repairHeaderNavigation(), react()]
});
