const SITE_NAME_CN='OiiOii爱好者社区';
const SITE_NAME_EN='OiiOii Fan Hub';
const SITE_NAME_FULL=`${SITE_NAME_CN} · ${SITE_NAME_EN}`;
const SITE_DISCLAIMER='本站为非官方的 OiiOii 爱好者社区，自在交流与展示 OiiOii 工具相关内容，与 OiiOii 官方无隶属关系。OiiOii 为其原公司注册商标。';

document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.nav-toggle');
  const list=document.getElementById('nav-list');
  if(toggle&&list){
    toggle.addEventListener('click',()=>{
      const expanded=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!expanded));
      list.classList.toggle('open');
    });
  }
  const langBar=document.querySelector('.lang-suggest');
  const langClose=document.querySelector('.lang-close');
  const langChoose=[...document.querySelectorAll('.lang-choose')];
  if(langBar&&langClose){
    langClose.addEventListener('click',()=>{langBar.style.display='none'});
  }
  if(langBar&&langChoose.length){
    langChoose.forEach(a=>a.addEventListener('click',(e)=>{e.preventDefault();langBar.style.display='none'}));
  }
  const promptRoot=document.querySelector('.prompt-builder');
  if(promptRoot){
    const chips=[...promptRoot.querySelectorAll('.chip[data-section]')];
    const output=promptRoot.querySelector('.prompt-output');
    const status=promptRoot.querySelector('.prompt-status');
    const generateBtn=promptRoot.querySelector('.prompt-generate');
    const copyBtn=promptRoot.querySelector('.prompt-copy');
    const sectionMap=[
      {key:'genderAge',label:'性别与年龄段'},
      {key:'personality',label:'性格 / 情绪'},
      {key:'appearance',label:'外貌特征'},
      {key:'outfit',label:'服装 / 配饰'},
      {key:'identity',label:'身份 / 职业'},
      {key:'style',label:'画风 / 流派'}
    ];
    const collectSelections=()=>{
      const selections={};
      chips.filter(chip=>chip.classList.contains('active')).forEach(chip=>{
        const key=chip.dataset.section;
        const token=chip.dataset.token||chip.textContent.trim();
        if(!selections[key]) selections[key]=[];
        if(!selections[key].includes(token)) selections[key].push(token);
      });
      return selections;
    };
    const buildPrompt=()=>{
      const selections=collectSelections();
      const parts=[];
      sectionMap.forEach(({key,label})=>{
        const picked=selections[key];
        if(picked&&picked.length){
          parts.push(`${label}：${picked.join('、')}`);
        }
      });
      if(!parts.length){
        return '';
      }
      return `角色提示词：${parts.join(' ｜ ')}。保持统一镜头光影，强调画面中的角色主体，输出高清立绘。`;
    };
    chips.forEach(chip=>{
      chip.addEventListener('click',()=>{
        chip.classList.toggle('active');
      });
    });
    if(generateBtn&&output){
      generateBtn.addEventListener('click',()=>{
        const prompt=buildPrompt();
        if(prompt){
          output.value=prompt;
          if(status) status.textContent='已生成，可复制后粘贴到喜欢的模型。';
        }else{
          output.value='';
          output.placeholder='请选择至少一个标签，再点击生成提示词。';
          if(status) status.textContent='请先完成左侧选择。';
        }
      });
    }
    if(copyBtn&&output){
      const copyText=async(text)=>{
        try{
          if(navigator.clipboard?.writeText){
            await navigator.clipboard.writeText(text);
            return true;
          }
        }catch{}
        try{
          const area=document.createElement('textarea');
          area.value=text;
          area.style.position='fixed';
          area.style.opacity='0';
          document.body.appendChild(area);
          area.focus();
          area.select();
          const ok=document.execCommand('copy');
          document.body.removeChild(area);
          return ok;
        }catch{
          return false;
        }
      };
      copyBtn.addEventListener('click',async()=>{
        const text=output.value.trim();
        if(!text){if(status) status.textContent='没有可复制的内容。';return;}
        const ok=await copyText(text);
        if(ok){
          if(status) status.textContent='已复制到剪贴板。';
        }else{
          if(status) status.textContent='复制失败，请手动选择文本。';
        }
      });
    }
  }
  const path=(location.pathname||'').toLowerCase();
  const pruneNav=()=>{
    try{
      const nav=document.getElementById('nav-list');
      if(!nav) return;
      const removeHrefs=['#agents','agents.html','#scenes','scenes.html'];
      [...nav.querySelectorAll('a')].forEach(a=>{
        const href=(a.getAttribute('href')||'').toLowerCase();
        if(removeHrefs.includes(href)){
          const li=a.closest('li');
          if(li) li.remove();
        }
      });
    }catch{}
  };
  pruneNav();

  const ensureNav=()=>{
    try{
      const nav=document.getElementById('nav-list');
      if(!nav) return;
      const want=['/','cases.html','styles.html','characters.html','tutorials.html','blog.html','tools.html','contact.html'];
      const textMap={'/':'首页','cases.html':'oiioii视频案例库','styles.html':'风格库','characters.html':'动画角色','tutorials.html':'教程中心','blog.html':'博客','tools.html':'辅助工具','contact.html':'oiioii官方信息'};
      const norm=(h)=>{let s=(h||'').toLowerCase(); if(!s||s==='') return '/'; if(s.startsWith('/')) s=s.slice(1); return s||'/';};
      const wantNorm=want.map(norm);
      const existing=[...nav.querySelectorAll('a')].map(a=>norm(a.getAttribute('href')));
      // 确保顺序与缺失项补齐
      wantNorm.forEach((hrefNorm, i)=>{
        if(!existing.includes(hrefNorm)){
          const li=document.createElement('li');
          const a=document.createElement('a');
          const rawHref=want[i];
          a.setAttribute('href',rawHref);
          a.textContent=textMap[rawHref];
          li.appendChild(a);
          nav.appendChild(li);
        }
      });
      // 按期望顺序重排
      const items=[...nav.querySelectorAll('li')];
      items.sort((liA,liB)=>{
        const ha=norm(liA.querySelector('a')?.getAttribute('href'));
        const hb=norm(liB.querySelector('a')?.getAttribute('href'));
        return wantNorm.indexOf(ha)-wantNorm.indexOf(hb);
      }).forEach(li=>nav.appendChild(li));
    }catch{}
  };
  ensureNav();
  const applySiteIdentity=()=>{
    try{
      document.querySelectorAll('.logo').forEach(logo=>{
        logo.textContent=SITE_NAME_FULL;
        logo.setAttribute('aria-label',`${SITE_NAME_CN}（${SITE_NAME_EN}）`);
      });
      if(document.title){
        if(!document.title.includes(SITE_NAME_CN)){
          document.title=`${document.title} | ${SITE_NAME_CN}`;
        }
      }else{
        document.title=SITE_NAME_CN;
      }
      const ensureMetaTag=(selector,attr,value,createCb)=>{
        let node=document.querySelector(selector);
        if(!node&&typeof createCb==='function'){
          node=createCb();
        }
        if(node){node.setAttribute(attr,value);}
        return node;
      };
      ensureMetaTag('meta[property="og:site_name"]','content',`${SITE_NAME_EN} · Unofficial`,()=>{
        const meta=document.createElement('meta');
        meta.setAttribute('property','og:site_name');
        document.head.appendChild(meta);
        return meta;
      });
      ensureMetaTag('meta[name="application-name"]','content',SITE_NAME_CN,()=>{
        const meta=document.createElement('meta');
        meta.setAttribute('name','application-name');
        document.head.appendChild(meta);
        return meta;
      });
      const footers=document.querySelectorAll('.footer-meta');
      footers.forEach(meta=>{
        const smalls=meta.querySelectorAll('small');
        if(smalls.length){
          smalls[0].textContent=`© 2025 ${SITE_NAME_CN}（${SITE_NAME_EN}） | 非官方粉丝站`;
        }
        const existingDisclaimer=[...smalls].find(el=>el.textContent&&el.textContent.includes('本站为非官方'));
        if(existingDisclaimer){
          existingDisclaimer.classList.add('site-disclaimer');
        }else if(!meta.querySelector('.site-disclaimer')){
          const note=document.createElement('small');
          note.className='site-disclaimer';
          note.textContent=SITE_DISCLAIMER;
          meta.appendChild(note);
        }
      });
    }catch(e){
      console.warn('应用站点身份信息失败',e);
    }
  };
  applySiteIdentity();
  const initTestimonials=()=>{
    const slider=document.querySelector('.testimonial-slider');
    if(!slider) return;
    const cards=[...slider.querySelectorAll('.testimonial-card')];
    const dots=[...slider.querySelectorAll('.testimonial-dots .dot')];
    const prev=slider.querySelector('.testimonial-nav.prev');
    const next=slider.querySelector('.testimonial-nav.next');
    if(!cards.length) return;
    let index=0;
    let autoTimer;
    const setActive=(idx)=>{
      index=(idx+cards.length)%cards.length;
      cards.forEach((card,i)=>card.classList.toggle('active',i===index));
      dots.forEach((dot,i)=>dot.classList.toggle('active',i===index));
    };
    const startAuto=()=>{
      stopAuto();
      autoTimer=setInterval(()=>setActive(index+1),8000);
    };
    const stopAuto=()=>{if(autoTimer){clearInterval(autoTimer);autoTimer=null;}};
    if(prev){prev.addEventListener('click',()=>{setActive(index-1);startAuto();});}
    if(next){next.addEventListener('click',()=>{setActive(index+1);startAuto();});}
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{setActive(i);startAuto();}));
    slider.addEventListener('mouseenter',stopAuto);
    slider.addEventListener('mouseleave',startAuto);
    setActive(0);
    startAuto();
  };
  initTestimonials();
  const initFAQ=()=>{
    const faq=document.querySelector('.faq-list');
    if(!faq) return;
    faq.addEventListener('click',(e)=>{
      const btn=e.target.closest('.faq-question');
      if(!btn) return;
      const item=btn.closest('.faq-item');
      if(!item) return;
      if(item.classList.contains('active')){
        item.classList.remove('active');
        return;
      }
      [...faq.querySelectorAll('.faq-item')].forEach(el=>el.classList.toggle('active',el===item));
    });
  };
  initFAQ();
  const initBlogTabs=()=>{
    const section=document.getElementById('blog-spotlight');
    if(!section) return;
    const tabs=[...section.querySelectorAll('.blog-tab')];
    const cards=[...section.querySelectorAll('.blog-feature')];
    const empty=section.querySelector('.blog-showcase__empty');
    if(!tabs.length||!cards.length) return;
    const showCategory=(filter)=>{
      let visible=0;
      tabs.forEach(tab=>{
        const active=(tab.dataset.filter||'all')===filter;
        tab.classList.toggle('is-active',active);
        tab.setAttribute('aria-pressed',active?'true':'false');
      });
      cards.forEach(card=>{
        const tags=(card.dataset.tags||'').split(/\s+/).filter(Boolean);
        const match=filter==='all'||tags.includes(filter);
        card.classList.toggle('hidden',!match);
        if(match) visible++;
      });
      if(empty){
        empty.classList.toggle('hidden',visible!==0);
      }
    };
    tabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        showCategory(tab.dataset.filter||'all');
      });
    });
    showCategory('all');
  };
  initBlogTabs();

  const inject=(sel,html)=>{const el=document.querySelector(sel);if(el){el.insertAdjacentHTML('beforeend',html)}};
  const loadManifest=async(url)=>{
    try{
      const res=await fetch(url);
      if(!res.ok) throw new Error('manifest not ok');
      const data=await res.json();
      const files=Array.isArray(data?.files)?data.files:[];
      const meta=(data&&typeof data.meta==='object')?data.meta:{};
      return {files,meta};
    }catch(e){
      console.warn('加载 manifest 失败',url,e);
      return {files:[],meta:{}};
    }
  };
  if(path.endsWith('scenes.html')){
    const md1=document.querySelector('meta[name="description"]');
    if(md1){md1.setAttribute('content','自媒体短视频 AI 制作工具、教学动画制作软件（教师专用）、产品宣传动画 AI 制作（企业）、生日祝福与情侣纪念等个人娱乐，一站式自动动画生成。')}
    inject('#media',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>批量生产：1人1天产出20集系列动画；风格统一：IP角色全程一致；多类型适配：短视频/MV/剧情/搞笑全覆盖。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>二次元账号、知识类自媒体、生活类博主、音乐UP主。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入核心需求→选择场景模板→调整风格参数→生成成片，支持二次编辑。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看自媒体热门案例</a> · <a class="link" href="tools.html">使用IP角色库与批量生成工具</a></p><p><a class="btn btn-primary" href="https://oiioii.ai/">立即创作</a></p>'
    );
    inject('#edu',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>快速迭代：1小时产出5分钟教学动画；低门槛：教师一人即可完成；知识可视化：复杂知识点生动呈现。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>中小学教师、教育机构、科普博主、培训讲师。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入知识点→选择教育模板→设置语速与标注→生成成片，支持字幕与知识点标注。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看教育类案例</a> · <a class="link" href="tools.html">使用科普提示词模板与字幕工具</a></p><p><a class="btn btn-primary" href="https://oiioii.ai/">立即创作</a></p>'
    );
    inject('#biz',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>专业质感：1080p高清输出；快速交付：3天完成宣传动画；品牌统一：融入Logo与配色。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>企业市场部、品牌方、营销代理公司、产品经理。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入产品卖点→选择营销模板→上传品牌元素→生成成片，支持修改。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看营销案例</a> · <a class="link" href="enterprise.html">咨询定制方案</a></p><p><a class="btn btn-primary" href="https://oiioii.ai/">立即创作</a></p>'
    );
    inject('#fun',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>零门槛：3步生成动画；个性化：支持自定义角色与场景；快速分享：一键导出至社交平台。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>普通用户、情侣、家长、兴趣爱好者。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>选择娱乐模板→输入个性化信息→选择风格→生成成片并分享。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看娱乐类案例</a> · <a class="link" href="tools.html">使用个性化提示词生成器</a></p><p><a class="btn btn-primary" href="https://oiioii.ai/">立即创作</a></p>'
    );
    inject('#derivative',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>全链路支持：从角色到衍生品设计；高适配性：符合生产标准；批量设计：同一IP多类型同步设计。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>IP创作者、文创商家、品牌方、设计师。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>导入角色→选择衍生品类型→调整参数→生成设计图并下载。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看衍生品设计案例</a> · <a class="link" href="tools.html">使用衍生品模板与3D建模工具</a></p><p><a class="btn btn-primary" href="https://oiioii.ai/">立即设计</a></p>'
    );
    inject('main','<section class="container section long-copy"><h2>如何为不同场景选择合适的 AI 动画方案</h2><p>创作场景的差异决定了 AI 动画的风格、镜头与节奏。对于自媒体短视频，我们更关注更新频率与系列内容的辨识度，建议使用 IP 角色库与批量模板来提升产能。对于教育场景，建议强化知识点标注与讲解逻辑，通过分镜师 Agent 将抽象概念拆解为易理解的镜头步骤。对于企业营销，重点在品牌统一与转化效果，应在艺术总监 Agent 中设置品牌色彩与线条规范，并选择适配投放平台的时长与字幕方案。对于个人娱乐与商业衍生，强调个性化与复用性，通过角色设计师与场景设计师建立可重复调用的视觉资产。</p><p>在自媒体场景中，使用“自媒体短视频 AI 制作工具”能够快速生成多风格内容。建议在提示词中明确账号调性与目标受众，如“二次元、治愈、日更”，并为每条内容设置 15–30 秒的时长与简单的镜头节奏。AI 动画制作将自动完成功能性工作，例如基础动作与转场，而创作者可以把精力放在选题与情绪表达上。自动动画生成与多智能体协同的结合，可以显著提升账号留存与增长。</p><p>在教育场景中，教师可通过“教学动画制作软件（教师专用）”的模板，以“知识点→分镜→讲解→字幕”的结构进行内容组织。分镜师 Agent 会为每个知识点配置镜头类型与时长，角色设计师与场景设计师提供视觉素材，动画师 Agent 实现镜头运动与动态合成，音效师 Agent 匹配清晰的旁白与适配的背景音乐。这样的 AI 动画创作流程既保证专业度，又保持低门槛，适合课堂演示与课件视频。</p><p>在企业营销中，市场团队可选择“产品宣传动画 AI 制作（企业）”方案。通过上传品牌元素与产品卖点，系统会自动生成品牌统一的脚本与分镜，并在动画师 Agent 的控制下形成专业成片。自动动画生成在 3 天内完成标准宣传片交付，并支持电商演示、品牌故事与培训视频等多种类型。AI 动画制作让营销节奏更快，投放更高效。</p><p>如果目标是个人娱乐，如“生日祝福动画制作 在线”“情侣纪念视频 AI 生成”，建议使用个性化模板与角色库，并在提示词中描述人物关系与情绪关键词（如“惊喜”“治愈”“可爱”）。系统会在艺术总监 Agent 的指导下为你选择合适的风格与色彩，在音效师 Agent 中匹配节日氛围的音乐与音效，最终形成具有仪式感的动画内容。</p><p>对于商业衍生，建议将角色与场景规范化存档，并在“商业衍生”版块中选择目标衍生品类型（海报、手办、抱枕等）。角色设计师与场景设计师将根据生产标准输出适配的设计图，动画师 Agent 提供动态预览，方便你在投产前确认风格与细节。这种“可复用资产 + 自动动画生成”的方法，有助于形成稳定的 IP 运营能力。</p></section>');
  }
  if(path.endsWith('tools.html')){
    const md2=document.querySelector('meta[name="description"]');
    if(md2){md2.setAttribute('content','提示词结构器、镜头节奏器、角色一致性清单、文案密度评估、字幕时间线生成器、缩略图生成器、风格对照表（即将上线），预约优先体验')}
  }
  if(path.endsWith('cases.html')){
    const md3=document.querySelector('meta[name="description"]');
    if(md3){md3.setAttribute('content','动画案例与成功案例：科普动画案例（教育机构）、二次元 MV 案例、企业宣传与培训视频案例，支持风格与时长筛选')}
    const ensureMeta=(name,content)=>{let m=document.querySelector('meta[name="'+name+'"]');if(!m){m=document.createElement('meta');m.setAttribute('name',name);document.head.appendChild(m)}m.setAttribute('content',content)};
    const ensureLink=(rel,href)=>{let l=document.querySelector('link[rel="'+rel+'"]');if(!l){l=document.createElement('link');l.setAttribute('rel',rel);document.head.appendChild(l)}l.setAttribute('href',href)};
    const ensureOG=(prop,content)=>{let m=document.querySelector('meta[property="'+prop+'"]');if(!m){m=document.createElement('meta');m.setAttribute('property',prop);document.head.appendChild(m)}m.setAttribute('content',content)};
    ensureOG('og:type','website');
    ensureOG('og:title',`${SITE_NAME_CN} 案例库`);
    ensureOG('og:description','AI 动画案例库（非官方粉丝向）：自媒体、教育、企业宣传与 MV，支持风格/时长筛选');
    ensureOG('og:url','https://oiianimation.com/cases.html');
    ensureOG('og:image','/oiiimage/Modern%20Animation.png');
    ensureMeta('twitter:card','summary_large_image');
    ensureMeta('twitter:title',`${SITE_NAME_CN} 案例库`);
    ensureMeta('twitter:description','OiiOii Fan Hub 汇总的 AI 动画案例，方便粉丝学习参考。');
    ensureMeta('twitter:image','/oiiimage/Modern%20Animation.png');
    ensureLink('canonical','https://oiianimation.com/cases.html');
    (async()=>{
      try{
        const [rootManifest, subManifest] = await Promise.all([
          loadManifest('oiivideo/manifest.json'),
          loadManifest('oiivideo/webcase/manifest.json')
        ]);
        const escapeText=(val='')=>String(val||'').replace(/[<>&"']/g,ch=>({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;' }[ch]));
        const combine=(manifest,prefix='')=>{
          return (manifest.files||[]).map(name=>{
            const meta=manifest.meta?.[name]||manifest.meta?.[decodeURIComponent(name)]||{};
            return {
              file:name,
              path:prefix?`${prefix}/${name}`:name,
              meta
            };
          });
        };
        const entries=[...combine(rootManifest), ...combine(subManifest,'webcase')];
        const grids={
          case: document.getElementById('video-grid-case'),
          mv: document.getElementById('video-grid-mv'),
          story: document.getElementById('video-grid-story'),
          music: document.getElementById('video-grid-music')
        };
        const getCategory=(entryPath)=>{
          const base=(entryPath.split('/').pop()||'').toLowerCase();
          if(entryPath.startsWith('webcase/')) return 'case';
          if(/^case/.test(base)) return 'case';
          if(/^mv/.test(base)) return 'mv';
          if(/^(story|stroy)/.test(base)) return 'story';
          if(/^music/.test(base)) return 'music';
          return 'case';
        };
        const slugify=(entryPath,title)=>{
          const base=(entryPath.split('/').pop()||'');
          const noExt=base.replace(/\.[^/.]+$/, '');
          const s=(title||noExt).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-+|-+$/g,'');
          const prefix=entryPath.startsWith('webcase/')?'webcase-':'';
          return prefix+(s||('case-'+noExt.replace(/[^a-z0-9]+/gi,'-')));
        };
        const toISO8601=(d)=>{
          try{
            const s=String(d||'');
            if(/\d+\s*秒/.test(s)){const n=parseInt(s.match(/\d+/)[0],10);return 'PT'+n+'S'}
            if(/\d+\s*分/.test(s)){const n=parseInt(s.match(/\d+/)[0],10);return 'PT'+n+'M'}
            if(/\d+\s*min/i.test(s)){const n=parseInt(s.match(/\d+/)[0],10);return 'PT'+n+'M'}
            if(/\d+\s*s(ec)?/i.test(s)){const n=parseInt(s.match(/\d+/)[0],10);return 'PT'+n+'S'}
          }catch{}
          return undefined;
        };
        const items=[];
        const addCard=(entry, grid)=>{
          const { path, meta } = entry;
          const titleRaw = meta.title || '';
          const title = escapeText(titleRaw);
          const scene = escapeText(meta.scene || '');
          const style = escapeText(meta.style || '');
          const duration = escapeText(meta.duration || '');
          const desc = escapeText(meta.description || '');
          const analysisText = escapeText(meta.analysis || '');
          const slug=slugify(path,titleRaw);
          const card=document.createElement('article');card.className='card';card.id=slug;
          if(title){
            const h3=document.createElement('h3');h3.className='case-card-title';
            const a=document.createElement('a');a.href='#'+slug;a.textContent=title;
            h3.appendChild(a);card.appendChild(h3);
          }
          const tagWrap=document.createElement('div');tagWrap.className='tags';
          if(scene){const s=document.createElement('span');s.className='tag';s.textContent=scene;tagWrap.appendChild(s);}
          if(style){const s=document.createElement('span');s.className='tag';s.textContent=style;tagWrap.appendChild(s);}
          if(duration){const s=document.createElement('span');s.className='tag';s.textContent=duration;tagWrap.appendChild(s);}
          card.appendChild(tagWrap);
          const video=document.createElement('video');
          video.setAttribute('data-src','/oiivideo/'+path);
          video.setAttribute('controls','');
          video.setAttribute('muted','');
          video.setAttribute('playsinline','');
          video.setAttribute('loop','');
          video.setAttribute('preload','none');
          video.setAttribute('poster','/oiiimage/Modern%20Animation.png');
          video.style.width='100%';
          video.style.borderRadius='12px';
          card.appendChild(video);
          if(desc){
            const p=document.createElement('p');p.textContent=desc;card.appendChild(p);
          }
          if(analysisText){
            const wrap=document.createElement('div');wrap.className='analysis';
            const h4=document.createElement('h4');h4.textContent='创作逻辑参考';wrap.appendChild(h4);
            const body=document.createElement('p');body.textContent=analysisText;wrap.appendChild(body);
            const note=document.createElement('p');note.className='note';note.textContent='参考分析，来源官网演示';wrap.appendChild(note);
            const more=document.createElement('p');const link=document.createElement('a');link.className='link';link.href='blog.html';link.textContent='查看更多案例拆解';more.appendChild(link);wrap.appendChild(more);
            card.appendChild(wrap);
          }
          grid.appendChild(card);
          const vo={"@context":"https://schema.org","@type":"VideoObject","name":title||slug,"description":desc||'',"thumbnailUrl":["https://oiianimation.com/oiiimage/Modern%20Animation.png"],"uploadDate":meta.uploadDate||undefined,"duration":toISO8601(meta.duration)||undefined,"contentUrl":"https://oiianimation.com/oiivideo/"+path,"embedUrl":"https://oiianimation.com/cases.html#"+slug};
          const vs=document.createElement('script');vs.type='application/ld+json';vs.textContent=JSON.stringify(vo);document.head.appendChild(vs);
          items.push({"@type":"ListItem","position":items.length+1,"url":"https://oiianimation.com/cases.html#"+slug});
        };
        entries.forEach(entry=>{
          const cat=getCategory(entry.path);
          const grid=grids[cat];
          if(grid) addCard(entry, grid);
        });
        const il={"@context":"https://schema.org","@type":"ItemList","itemListElement":items};
        const ils=document.createElement('script');ils.type='application/ld+json';ils.textContent=JSON.stringify(il);document.head.appendChild(ils);
        const bc={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"首页","item":"https://oiianimation.com/"},{"@type":"ListItem","position":2,"name":"案例库","item":"https://oiianimation.com/cases.html"}]};
        const bcs=document.createElement('script');bcs.type='application/ld+json';bcs.textContent=JSON.stringify(bc);document.head.appendChild(bcs);
        const setupLazy=()=>{
          const vids=[...document.querySelectorAll('section .card video[data-src]')];
          if(!vids.length) return;
          let loading=0;const maxLoad=3;
          const loadOne=(v)=>{
            if(v.dataset._loaded) return; if(loading>=maxLoad) return;
            loading++; v.src=v.getAttribute('data-src'); v.load();
            v.play().catch(()=>{}); v.dataset._loaded='1'; v.addEventListener('loadeddata',()=>{loading=Math.max(0,loading-1)});
          };
          const io=new IntersectionObserver(entries=>{
            entries.forEach(e=>{
              const v=e.target; if(e.isIntersecting){ loadOne(v) } else { try{ v.pause() }catch{} }
            });
          },{root:null,threshold:0.25});
          vids.forEach(v=>io.observe(v));
        };
        setupLazy();
      }catch(e){console.warn('加载 oiivideo manifest 失败',e)}
    })();

    (async()=>{
      try{
        const manifest=await loadManifest('oiivideo/uservideo/manifest.json');
        const hrefs=manifest.files||[];
        const grid=document.getElementById('user-video-grid');
        const empty=document.getElementById('user-video-empty');
        if(grid&&hrefs.length){
          if(empty) empty.style.display='none';
          hrefs.forEach(fn=>{
            const card=document.createElement('article');card.className='card';
            card.innerHTML='<video data-src="/oiivideo/uservideo/'+fn+'" controls muted playsinline loop preload="none" style="width:100%;border-radius:12px"></video>';
            grid.appendChild(card);
          });
          const vids=[...grid.querySelectorAll('video[data-src]')];
          let loading=0;const maxLoad=2;
          const loadOne=(v)=>{ if(v.dataset._loaded) return; if(loading>=maxLoad) return; loading++; v.src=v.getAttribute('data-src'); v.load(); v.play().catch(()=>{}); v.dataset._loaded='1'; v.addEventListener('loadeddata',()=>{loading=Math.max(0,loading-1)}); };
          const io=new IntersectionObserver(entries=>{
            entries.forEach(e=>{ const v=e.target; if(e.isIntersecting){ loadOne(v) } else { try{ v.pause() }catch{} } });
          },{root:null,threshold:0.25});
          vids.forEach(v=>io.observe(v));
        }else{
          if(empty) empty.style.display='block';
        }
      }catch(e){
        const empty=document.getElementById('user-video-empty');
        if(empty) empty.style.display='block';
        console.warn('加载用户案例失败',e)
      }
    })();

  }
  if(path.endsWith('styles.html')){
    const input=document.getElementById('style-search');
    const wrap=document.getElementById('style-tags');
    if(input&&wrap){
      input.addEventListener('input',()=>{
        const q=input.value.trim().toLowerCase();
        wrap.querySelectorAll('.tag').forEach(t=>{
          const name=(t.getAttribute('data-name')||t.textContent||'').toLowerCase();
          t.classList.toggle('hidden',q&&name.indexOf(q)===-1);
        });
      });
      wrap.addEventListener('click',(e)=>{
        const t=e.target.closest('.tag');
        if(!t) return;
        const name=t.getAttribute('data-name')||t.textContent||'';
        input.value=name;
        input.dispatchEvent(new Event('input'));
        // 同步筛选图片
        filterImages(name);
      });
    }

    const styleFromName=(n)=>decodeURIComponent(n).split('/').pop().replace(/\.[^/.]+$/, '').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
    const info={
      '3d chibi':{description:'圆润体块与夸张比例构成的萌系美学，材质光泽与简化阴影提升亲和力，适合轻松、温暖与喜剧化叙事',lenses:'近景与表情特写、跟随镜头与跳切强化节奏',scenarios:'儿童向内容、品牌周边、轻剧情短片、社交表情包',keywords:'3D 萌系、卡通质感、可爱角色、轻喜剧',alt:'3D Chibi 萌系角色风格示例图'},
      'aether toned lineart':{description:'清晰线稿与克制配色，强调构图与留白，适合信息清晰、结构感强的视觉呈现',lenses:'静态分镜、流程化演示、过渡平稳',scenarios:'分镜脚本、产品说明、Editorial 海报与教程',keywords:'线稿插画、极简配色、留白构图、Editorial',alt:'Aether‑Toned 线稿风格示例图'},
      'atmospheric glaze':{description:'柔和层叠与体积光制造空间层次，薄雾与渐变色块塑造情绪氛围，具有电影感与沉浸体验',lenses:'慢推与横移，突出环境叙事与情绪波动',scenarios:'概念气氛图、夜景城市、音乐概念短片',keywords:'氛围光、体积雾、渐变色、电影感',alt:'Atmospheric Glaze 氛围釉彩风格示例图'},
      'chroma etch':{description:'蚀刻般的高对比线条与版画质感，结构张力强，适合强调力量、反叛或独立气质的视觉表达',lenses:'海报式构图与快速剪辑传达图形冲击',scenarios:'视觉海报、音乐相关、品牌主视觉',keywords:'版画质感、蚀刻线条、强对比、图形叙事',alt:'Chroma Etch 高对比蚀刻风格示例图'},
      'chroma glow':{description:'霓虹辉光与赛博配色，背光剪影与高光 Bloom 构建潮流科技的夜景美学',lenses:'夜景灯光、闪切与节奏驱动',scenarios:'赛博朋克、科技品牌、夜生活题材',keywords:'霓虹、赛博、辉光特效、夜景氛围',alt:'Chroma Glow 霓虹辉光赛博风格示例图'},
      'city pop':{description:'80s 日系复古审美，霓虹与粉彩并置，常配 VHS 纹理与都会浪漫情绪，复古又现代',lenses:'街景广角、平移与剪影、音乐节奏驱动',scenarios:'都市生活、爱情故事、音乐视觉化',keywords:'复古流行、80s、VHS、都市浪漫',alt:'City Pop 复古都市风格示例图'},
      'clay toy':{description:'黏土材质与手作痕迹带来温度与童趣，定格动画质感强调质地与细节',lenses:'逐帧运动、微距与浅景深',scenarios:'亲子教育、产品形态展示、童趣广告',keywords:'黏土动画、定格、手作质感、童趣',alt:'Clay Toy 黏土定格风格示例图'},
      'cozy watercolor':{description:'纸张纹理与柔和晕染构建治愈气质，低饱和暖色适合生活方式与自然题材',lenses:'缓慢推进与呼吸式节奏',scenarios:'文旅、自然插画、品牌温情内容',keywords:'水彩插画、治愈、纸张纹理、自然',alt:'Cozy Watercolor 温柔水彩风格示例图'},
      'dragon ball':{description:'高饱和色彩与强轮廓线，速度线与动势夸张成就热血少年漫的爆发力',lenses:'快速推拉、镜头摇移、冲突节奏',scenarios:'战斗/体育、动作演示、动效广告',keywords:'少年漫、热血、战斗分镜、动势',alt:'Dragon Ball 热血少年漫风格示例图'},
      'ethereal gothic':{description:'哥特结构与深阴影塑造庄严与仪式感，冷灰与金属色呈现空灵暗黑的高级美学',lenses:'仰视与纵深透视、体积光与空间雕刻',scenarios:'暗黑奇幻、古典题材、高奢品牌视觉',keywords:'哥特、暗黑美学、体积光、仪式感',alt:'Ethereal Gothic 空灵暗黑哥特风格示例图'},
      'ethereal hyper realism':{description:'高细节写实结合柔光与空气透视，梦幻但真实，适合强调质感与高级感',lenses:'微距特写、慢镜头、临场体验',scenarios:'精品品牌广告、艺术短片、写实角色与场景',keywords:'超写实、柔光、空气透视、梦幻感',alt:'Ethereal Hyperrealism 空灵超写实风格示例图'},
      'ethereal resolution':{description:'高分辨率纹理与锐利细节，保留柔光氛围，适合品牌海报与高清展示',lenses:'静态特写与缓慢推镜，聚焦纹理与材质',scenarios:'品牌海报、产品静帧、高清概念图',keywords:'高清质感、锐利细节、柔光氛围',alt:'Ethereal Resolution 空灵高清质感示例图'},
      'family guy':{description:'美式扁平与粗线条卡通，块面色彩与简化面部，轻松幽默的叙事表达',lenses:'中景与全景调度、对话驱动',scenarios:'生活方式幽默、脑洞短片、社会话题轻内容',keywords:'美式动画、扁平风格、家庭喜剧、幽默叙事',alt:'Family Guy 西式扁平喜剧风格示例图'},
      'ghibli style':{description:'手绘质感、温暖色彩与柔和光影，叙事氛围强，适合治愈系与故事短片',lenses:'慢镜头、景深控制、叙事推进',scenarios:'家庭叙事、自然主题、治愈系短片',keywords:'手绘、温暖、柔光、叙事',alt:'Ghibli Style 手绘治愈示例图'},
      'lo fi chibi':{description:'低饱和色、颗粒噪点与简化线条，小尺寸社媒友好',lenses:'定帧与简剪、轻节奏',scenarios:'社交表情包、轻剧情短视频',keywords:'Lo‑Fi、Q版、颗粒、轻节奏',alt:'Lo‑Fi Chibi 低饱和颗粒示例图'},
      'visual novel':{description:'高分辨率赛璐珞上色与氛围光背景，角色细节丰富并配有对话框布局',lenses:'固定机位与面部特写，景深明显，对话框占画面空间',scenarios:'游戏预告、角色介绍、对白驱动的情节展示',keywords:'赛璐珞、氛围光、高分辨率、静态特写、日系CG',alt:'Visual Novel 视觉小说风格示例图'},
      'modern animation':{description:'当代卡通综合风格与清晰轮廓线，广泛适配商业与科普',lenses:'清晰构图与信息优先',scenarios:'商业宣传、教育科普、信息图动画',keywords:'现代动画、清晰轮廓、商业与科普',alt:'Modern Animation 当代卡通示例图'},
      'minecraft':{description:'方块材质与低多边形结构，适合沙盒与游戏主题',lenses:'俯仰切换与格点构图',scenarios:'游戏主题、像素风叙事',keywords:'像素、方块、低多边形、沙盒',alt:'Minecraft 像素方块示例图'},
      'chroma grit sketch':{description:'颗粒质感与速写线条，即兴氛围强，适合草图与概念',lenses:'快速素描与手绘质感呈现',scenarios:'概念草图、风格探索',keywords:'颗粒速写、即兴、手绘',alt:'Chroma‑Grit 颗粒速写示例图'},
      'soft focus lumina':{description:'低对比柔焦与边缘光晕，温暖氛围，适合情感片段',lenses:'柔焦镜头与慢节奏',scenarios:'情感片段、温暖氛围短片',keywords:'柔焦、光晕、温暖氛围',alt:'Soft‑Focus Lumina 柔焦光晕示例图'},
      'soft chibi':{description:'圆润造型与低饱和调色，亲和可爱，适合社交传播',lenses:'表情特写与快剪',scenarios:'社交传播、轻喜剧',keywords:'软萌、低饱和、Q版',alt:'Soft Chibi 柔感Q版示例图'},
      'honkai star rail':{description:'工业细节与未来配色，适合科幻与机甲题材',lenses:'机甲特写与快速运镜',scenarios:'科幻题材、机甲展示',keywords:'科幻、机甲、未来配色',alt:'Honkai Star Rail 工业未来示例图'},
      'focal light render':{description:'明确光斑与主体突出，适合产品展示与重点镜头',lenses:'聚光与对比强化',scenarios:'产品镜头、重点展示',keywords:'焦点光、高对比、产品渲染',alt:'Focal‑Light Render 焦点光渲示例图'},
      'luminous bloom':{description:'柔光与高光溢出营造梦幻纯净氛围，配合 Bloom 特效呈现超凡气质',lenses:'慢速推进与景深特写突出光线扩散',scenarios:'艺术展示、高端品牌、幻想题材',keywords:'柔光、高光溢出、梦幻、纯净、Bloom',alt:'Luminous Bloom 辉光流明风示例图'},
      'neo renaissance':{description:'古典构图与现代调色，适合历史与品牌叙事',lenses:'黄金分割与古典构图',scenarios:'历史题材、品牌叙事',keywords:'文艺复兴、古典构图、现代调色',alt:'Neo‑Renaissance 新文艺复兴示例图'},
      'rotoscoped animation':{description:'根据真人拍摄逐帧描摹，线条清晰且动作真实流畅，保留独特运动轨迹',lenses:'正常视角运镜，慢放或加速强调动作细节',scenarios:'动作片段、写实人物、纪录片叙事、高难度动作展示',keywords:'真实动作、流畅线条、描绘轮廓、运动写实、黑边描绘',alt:'Rotoscoped Animation 转描风格示例图'},
      'cutout animation':{description:'剪纸/卡纸材质与平面拼贴质感，粗糙边缘打造手工感',lenses:'侧面固定镜位与短距离平移，突出拼合与部件移动',scenarios:'教育片、民间故事、创意短片、低成本创意项目',keywords:'剪纸、卡纸、平面拼贴、二维运动、粗糙边缘',alt:'Cutout Animation 剪纸动画风示例图'},
      'sand animation':{description:'沙子颗粒在背光板上即兴流动，画面持续形变带来诗意',lenses:'慢速平移与近距离特写，强调连续变化',scenarios:'情感表达、过渡片头、艺术表演与诗意叙事',keywords:'沙子颗粒、流动、即兴、背光、艺术表演',alt:'Sand Animation 沙画风格示例图'},
      'expressionist sketch':{description:'夸张形体、粗犷笔触与非自然色彩营造强烈心理情绪',lenses:'晃动镜头与扭曲视角表达主观情绪',scenarios:'心理/戏剧主题、艺术短片、强调内心挣扎的段落',keywords:'夸张形体、粗犷笔触、非自然色彩、强烈情感、速写',alt:'Expressionist Sketch 表现主义速写示例图'},
      'surreal cartoon':{description:'梦境般的逻辑颠倒与奇特组合，达利式变形产生幽默抽象感',lenses:'意想不到的转场与突兀出现/消失的物体',scenarios:'概念艺术、抽象思考、创意广告、想象力短片',keywords:'逻辑颠倒、梦境、奇特组合、抽象、达利式变形',alt:'Surreal Cartoon 超现实卡通示例图'},
      'art nouveau line':{description:'装饰性曲线与藤蔓图案交织，柔和色彩呈现复古优雅',lenses:'平视中景聚焦装饰细节，画面流动缓慢',scenarios:'装饰/时尚、高雅品牌、女性题材、复古设计',keywords:'装饰性线条、曲线优雅、平面化、复古优雅',alt:'Art Nouveau Line 新艺术运动线条示例图'},
      'constructivism poster':{description:'几何图形与强烈斜线构图，红黑白工业美学凸显结构力量',lenses:'对角线构图与快速切换强调张力',scenarios:'科技/历史/宣传主题、强调效率的硬核视觉',keywords:'几何图形、强斜线、红黑白、工业美学、结构力量',alt:'Constructivism Poster 构成主义海报示例图'},
      'cel shading':{description:'3D 模型采用平坦硬朗阴影分层，呈现仿 2D 赛璐珞质感',lenses:'360° 环绕或平视中景突出轮廓',scenarios:'游戏角色、低多边形 3D 卡通、需要 3D 景深又保留 2D 观感',keywords:'3D卡通、硬阴影、赛璐珞光影、清晰线条',alt:'Cel Shading 赛璐珞渲染示例图'},
      'isometric pixel art':{description:'等距 45° 像素视角展现立体空间，建筑/场景信息一览无余',lenses:'固定俯视以全景呈现，平稳平移浏览',scenarios:'城市建设、地图设计、游戏 UI、复古科技主题',keywords:'等距视角、像素化、45度角、立体空间',alt:'Isometric Pixel Art 等距像素示例图'},
      'cyberpunk anime':{description:'霓虹蓝紫红配色与湿润街道，重阴影塑造高科技低生活的夜景',lenses:'追踪镜头与低角度，强化光影对比与纵深',scenarios:'科技/未来主义叙事、游戏/夜景主题',keywords:'霓虹、高对比、湿润街道、强阴影、未来',alt:'Cyberpunk Anime 赛博朋克动画示例图'},
      'americana vintage':{description:'30 年代橡胶软管卡通，黑白或低饱和色彩搭配夸张喜剧动作',lenses:'快速变形与音乐节奏驱动的镜头，带胶片颗粒',scenarios:'怀旧向内容、复古游戏、幽默喜剧、音乐 MV',keywords:'橡胶软管、黑白、30s动画、夸张动作、复古美式',alt:'Americana Vintage 复古美式动画示例图'},
      'lo fi chibi':{description:'低保真颗粒感与柔和色调，Chill 情绪的 Q 版角色搭配复古滤镜',lenses:'室内静物与慢速平移营造放松节奏',scenarios:'音乐背景、放松App、个人博客、情感主题',keywords:'低保真、颗粒感、治愈、Chill、柔和色调',alt:'Lo‑Fi Chibi 低保真Q版风示例图'},
      'luminous bloom':{description:'柔光与高光溢出营造梦幻纯净氛围，配合 Bloom 特效呈现超凡气质',lenses:'慢速推进与景深特写突出光线扩散',scenarios:'艺术展示、高端品牌、幻想题材',keywords:'柔光、高光溢出、梦幻、纯净、Bloom',alt:'Luminous Bloom 辉光流明风示例图'},
      'game boy':{description:'低色数像素与单色调，适合怀旧与游戏主题',lenses:'像素化转场与HUD元素',scenarios:'怀旧短片、游戏主题',keywords:'掌机、像素、单色',alt:'Game Boy 复古掌机示例图'},
      'vitreous render':{description:'高光折射与透明材质，适合未来科技与产品视觉',lenses:'折射特写与旋转展示',scenarios:'科技产品、材质展示',keywords:'玻璃质感、折射、透明材质',alt:'Vitreous Render 玻璃质感示例图'}
    };
    const placeholderStyles=new Set([
      'americana vintage',
      'art nouveau line',
      'cel shading',
      'constructivism poster',
      'cutout animation',
      'cyberpunk anime',
      'expressionist sketch',
      'isometric pixel art',
      'rotoscoped animation',
      'sand animation',
      'surreal cartoon'
    ]);
    const gallery=document.getElementById('style-gallery');
    const empty=document.getElementById('style-empty');
    const render=async()=>{
      try{
        const manifest=await loadManifest('oiiimage/fengge/manifest.json');
        const hrefs=(manifest.files||[]).map(fn=>'fengge/'+fn);
        const metaSub=manifest.meta||{};
        if(gallery&&hrefs.length){
          const arr=hrefs.map(fn=>({fn, style:styleFromName(fn)}))
            .sort((a,b)=>a.style.localeCompare(b.style,'zh-Hans'));
          let rendered=0;
          arr.forEach(({fn,style})=>{
            const name=decodeURIComponent(fn);
            const m=(metaSub[fn]||metaSub[name]||{});
            const title=m.title||style;
            const styleTag=m.style||style;
            const canonicalStyle=styleTag.toLowerCase();
            if(placeholderStyles.has(canonicalStyle)) return;
            const metaInfo=info[styleTag.toLowerCase()]||{};
            const altText=metaInfo.alt||title;
            const sanitize=(s)=>String(s||'').replace(/\bfengge\//gi,'').replace(/\s+/g,' ').trim();
            const desc=sanitize(m.description||metaInfo.description||'');
            const lenses=sanitize(metaInfo.lenses||'');
            const scenarios=sanitize(metaInfo.scenarios||'');
            const kwBase=(m.keywords||metaInfo.keywords||styleTag||'');
            const keywords=sanitize(kwBase).replace(/\s*[,|\/]+\s*/g,'、');
            const card=document.createElement('article');card.className='card style-row';
            card.setAttribute('data-style',styleTag.toLowerCase());
            const ALT = altText;
            card.innerHTML='<div class="style-row-img">'
              +'<img class="style-img" src="/oiiimage/'+fn+'" alt="'+ALT+'" loading="lazy" />'
              +'</div>'
              +'<div class="style-row-body">'
              +'<h3 class="style-card-title">'+title+'</h3>'
              +'<dl class="style-meta">'
              +(desc?'<dd class="style-desc">'+desc+'</dd>':'')
              +(lenses?'<dt>镜头语言</dt><dd>'+lenses+'</dd>':'')
              +(scenarios?'<dt>适用场景</dt><dd>'+scenarios+'</dd>':'')
              +(keywords?'<dt>关键词</dt><dd>'+keywords+'</dd>':'')
              +'</dl>'
              +'<p class="style-cta"><a class="btn btn-primary" href="https://oiioii.ai/">立即体验</a></p>'
              +'</div>';
            gallery.appendChild(card);
            rendered++;
          });
          if(empty) empty.style.display=rendered?'none':'block';
        }else{
          if(empty) empty.style.display='block';
        }
      }catch(e){if(empty) empty.style.display='block';console.warn('风格图片加载失败',e)}
    };

    const filterImages=(q)=>{
      const qq=(q||input?.value||'').trim().toLowerCase();
      gallery?.querySelectorAll('.card').forEach(c=>{
        const s=c.getAttribute('data-style')||'';
        c.classList.toggle('hidden',qq&&s.indexOf(qq)===-1);
      });
    };

    render().then(()=>{
      input?.addEventListener('input',()=>filterImages(input.value));
    });
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  const path=(location.pathname||'').toLowerCase();
  if(path.endsWith('characters.html')){
    const DATA_PATH='data/character-presets.json';
    const placeholderPool=['/oiiimage/juese1.png','/oiiimage/juese2.png','/oiiimage/juese3.png','/oiiimage/juese4.png'];
    const filterSets={
      genderAge:['少年','青年男性','大叔','少女','御姐','萝莉','正太'],
      personality:['傲娇','病娇','抖S','抖M','元气','天然呆','腹黑','温柔','电波系','酷哥','反差萌','黑化'],
      appearance:['黑长直','白毛','双马尾','兽耳','异色瞳','眼罩','机械义肢','翅膀','狐耳','猫耳','龙角','渐变发','短发','巨乳','贫乳','绝对领域'],
      outfit:['旗袍','女仆装','泳装','婚纱','和服','哥特萝莉','JK制服','战斗装','礼服','睡衣','兔女郎','体操服','裸围裙','破衣'],
      identity:['魔王','勇者','吸血鬼','死神','魔法少女','机器人','龙娘','巫女','恶魔','舰娘','忍者','神明','枪械少女','人造人'],
      style:['UFO桌','扳机社','京都脸','shaft','韩漫风','新国风','Netflix暗黑风','90年代风','Pixiv高质量','Pony狂气']
    };
    const createFilterStore=()=>({
      genderAge:new Set(),
      personality:new Set(),
      appearance:new Set(),
      outfit:new Set(),
      identity:new Set(),
      style:new Set()
    });
    const storeSelected=createFilterStore();
    const toggleFilter=(group,value,btn)=>{
      const set=storeSelected[group];
      if(set.has(value)){
        set.delete(value);
        btn?.classList?.remove('active');
      }else{
        set.add(value);
        btn?.classList?.add('active');
      }
      renderActiveFilters();
      updateVisibility();
    };
    const chipsWraps=[...document.querySelectorAll('[data-filter-group]')];
    const buildChips=()=>{
      chipsWraps.forEach(w=>{
        const key=w.dataset.filterGroup;
        (filterSets[key]||[]).forEach(tag=>{
          const btn=document.createElement('button');
          btn.type='button';
          btn.className='chip';
          btn.textContent=tag;
          btn.dataset.value=tag;
          btn.addEventListener('click',()=>toggleFilter(key,tag,btn));
          w.appendChild(btn);
        });
      });
    };
    buildChips();
    const presetGrid=document.getElementById('preset-grid');
    const emptyState=document.getElementById('preset-empty');
    const searchInput=document.getElementById('preset-search');
    const activeFilterWrap=document.getElementById('active-filters');
    const countDom=document.getElementById('result-count');
    const totalDom=document.getElementById('total-count');
    const clearBtn=document.getElementById('clear-filters');
    const tagMatchCache=new Map();
    const escapeHtml=(str='')=>
      String(str)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39;');
    const deriveTags=(preset)=>{
      if(tagMatchCache.has(preset.id)) return tagMatchCache.get(preset.id);
      const res={};
      const src=preset.tags||{};
      Object.entries(src).forEach(([group,val])=>{
        if(Array.isArray(val)) res[group]=val.filter(Boolean);
        else if(val) res[group]=[val];
      });
      tagMatchCache.set(preset.id,res);
      return res;
    };
    let currentPresets=[];
    const buildPromptSection=(preset)=>{
      const prompt=(preset.prompt||'').trim();
      const negative=(preset.negative||'').trim();
      if(!prompt && !negative) return null;
      const snippetSource=prompt||negative;
      const normalized=(snippetSource||'').replace(/\s+/g,' ').trim();
      const truncated=normalized.length>80?`${normalized.slice(0,80)}…`:normalized||'查看提示词';
      const details=document.createElement('details');
      details.className='prompt-block';
      details.dataset.id=preset.id;
      const summary=document.createElement('summary');
      summary.className='prompt-summary';
      const span=document.createElement('span');span.textContent=truncated;summary.appendChild(span);
      details.appendChild(summary);
      const content=document.createElement('div');content.className='prompt-content';
      if(prompt){
        const line=document.createElement('div');line.className='prompt-line';
        const label=document.createElement('span');label.className='prompt-label';label.textContent='Prompt';line.appendChild(label);
        const text=document.createElement('p');text.className='prompt-text';text.textContent=prompt;line.appendChild(text);
        content.appendChild(line);
      }
      if(negative){
        const line=document.createElement('div');line.className='prompt-line negative';
        const label=document.createElement('span');label.className='prompt-label';label.textContent='Negative';line.appendChild(label);
        const text=document.createElement('p');text.className='prompt-text';text.textContent=negative;line.appendChild(text);
        content.appendChild(line);
      }
      details.appendChild(content);
      return details;
    };
    const buildCard=(preset)=>{
      const card=document.createElement('article');card.className='preset-card';
      const idx=Number(preset.id)||0;
      const cover=preset.cover||placeholderPool[(idx-1+placeholderPool.length)%placeholderPool.length];
      const tagMap=deriveTags(preset);
      const tagLine=[...new Set(Object.values(tagMap).flat())].slice(0,3);
      const styleLabel=preset.style_cn ? `${preset.style_cn}` : '';
      const params=preset.params||'--stylize 600';
      const promptSection=buildPromptSection(preset);

      const metaWrap=document.createElement('div');metaWrap.className='card-meta';
      const metaLeft=document.createElement('div');
      const h3=document.createElement('h3');h3.textContent=preset.title||'';metaLeft.appendChild(h3);
      const en=document.createElement('p');en.className='preset-en';en.textContent=preset.title_en||'';metaLeft.appendChild(en);
      metaWrap.appendChild(metaLeft);
      const idSpan=document.createElement('span');idSpan.className='preset-id';idSpan.textContent='#'+String(preset.id).padStart(3,'0');metaWrap.appendChild(idSpan);
      card.appendChild(metaWrap);

      const info=document.createElement('div');info.className='card-info';
      if(styleLabel){const pill=document.createElement('span');pill.className='style-pill';pill.textContent=styleLabel;info.appendChild(pill);}
      const paramSpan=document.createElement('span');paramSpan.className='params';paramSpan.textContent='参数 '+params;info.appendChild(paramSpan);
      card.appendChild(info);

      const fig=document.createElement('figure');
      const img=document.createElement('img');img.src=cover;img.alt=preset.title||'';img.loading='lazy';img.decoding='async';fig.appendChild(img);
      card.appendChild(fig);

      const body=document.createElement('div');body.className='card-body';
      const tagRow=document.createElement('div');tagRow.className='tag-row';
      tagLine.forEach(t=>{const span=document.createElement('span');span.textContent=t;tagRow.appendChild(span);});
      body.appendChild(tagRow);
      if(promptSection){body.appendChild(promptSection);}
      const actions=document.createElement('div');actions.className='card-actions';
      const btn=document.createElement('button');btn.type='button';btn.className='copy-link';btn.dataset.action='copy';btn.dataset.id=preset.id;btn.textContent='复制提示词';
      actions.appendChild(btn);
      body.appendChild(actions);
      card.appendChild(body);

      card.dataset.id=preset.id;
      const searchText=`${preset.title||''} ${preset.title_en||''} ${preset.prompt||''} ${preset.negative||''}`.toLowerCase();
      card.dataset.search=searchText;
      card.dataset.tags=JSON.stringify(tagMap);
      return card;
    };
    const renderPresets=(list=[])=>{
      if(!presetGrid) return;
      presetGrid.innerHTML='';
      const frag=document.createDocumentFragment();
      list.forEach(item=>frag.appendChild(buildCard(item)));
      presetGrid.appendChild(frag);
      updateVisibility();
    };
    const updateVisibility=()=>{
      if(!presetGrid) return;
      const query=(searchInput?.value||'').trim().toLowerCase();
      const cards=[...presetGrid.querySelectorAll('.preset-card')];
      let visible=0;
      cards.forEach(card=>{
        const presetId=Number(card.dataset.id);
        const tagMap=JSON.parse(card.dataset.tags||'{}');
        const matchesSearch=!query || card.dataset.search.includes(query);
        let matchesFilter=true;
        for(const [group,set] of Object.entries(storeSelected)){
          if(set.size){
            const tags=tagMap[group]||[];
            const has=[...set].some(tag=>tags.includes(tag));
            if(!has){matchesFilter=false;break;}
          }
        }
        const shouldShow=matchesSearch && matchesFilter;
        card.classList.toggle('hidden',!shouldShow);
        if(shouldShow) visible++;
      });
      countDom.textContent=String(visible);
      const noResult=visible===0;
      if(emptyState) emptyState.classList.toggle('hidden',!noResult);
    };
    const renderActiveFilters=()=>{
      if(!activeFilterWrap) return;
      activeFilterWrap.innerHTML='';
      Object.entries(storeSelected).forEach(([group,set])=>{
        set.forEach(tag=>{
          const chip=document.createElement('button');
          chip.type='button';
          chip.className='chip ghost';
          chip.textContent=tag;
          chip.addEventListener('click',()=>{
            storeSelected[group].delete(tag);
            document.querySelectorAll(`[data-filter-group=\"${group}\"] .chip`).forEach(btn=>{
              if(btn.dataset.value===tag) btn.classList.remove('active');
            });
            renderActiveFilters();
            updateVisibility();
          });
          activeFilterWrap.appendChild(chip);
        });
      });
    };
    const buildCopyText=(preset)=>{
      const segments=[
        `角色：#${String(preset.id).padStart(3,'0')} ${preset.title}${preset.title_en?` / ${preset.title_en}`:''}`
      ];
      if(preset.prompt){
        segments.push(`Prompt:\n${preset.prompt}`);
      }
      if(preset.negative){
        segments.push(`Negative:\n${preset.negative}`);
      }
      if(preset.params){
        segments.push(`参数：${preset.params}`);
      }
      return segments.join('\n\n');
    };
    const copyText=async(text)=>{
      if(navigator.clipboard?.writeText){
        await navigator.clipboard.writeText(text);
        return true;
      }
      const area=document.createElement('textarea');
      area.value=text;
      area.style.position='fixed';
      area.style.opacity='0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      let ok=false;
      try{
        ok=document.execCommand('copy');
      }catch{
        ok=false;
      }
      document.body.removeChild(area);
      return ok;
    };
    const handleCopyPrompt=async(presetId,btn)=>{
      const preset=currentPresets.find(p=>p.id===presetId);
      if(!preset) return;
      try{
        const success=await copyText(buildCopyText(preset));
        if(success){
          if(btn){
            btn.dataset.originalText=btn.textContent;
            btn.textContent='已复制！';
            btn.disabled=true;
            setTimeout(()=>{
              btn.textContent=btn.dataset.originalText||'复制提示词';
              btn.disabled=false;
            },1500);
          }else{
            alert('提示词已复制');
          }
        }else{
          alert('复制失败，请手动复制');
        }
      }catch(e){
        alert('复制失败，请手动复制');
        console.warn('copy prompt failed',e);
      }
    };
    const resolveData=async()=>{
      const basePath=window.location.pathname.replace(/[^/]*$/, '');
      const candidates=[
        `${basePath}data/character-presets.json`,
        '/data/character-presets.json',
        DATA_PATH
      ];
      const tried=new Set();
      for(const raw of candidates){
        const url=raw.replace(/\/+/g,'/').replace(':/','://');
        if(tried.has(url)) continue;
        tried.add(url);
        try{
          const res=await fetch(url);
          if(res.ok) return res.json();
        }catch(e){}
      }
      throw new Error('presets-load-failed');
    };

    const initWithData=(payload)=>{
      currentPresets=Array.isArray(payload?.presets)?payload.presets:[];
      renderPresets(currentPresets);
      totalDom.textContent=String(currentPresets.length||0);
    };

    if(window.CHARACTER_PRESETS){
      initWithData(window.CHARACTER_PRESETS);
    }else{
      resolveData().then(initWithData).catch(()=>{
        if(emptyState) emptyState.classList.remove('hidden');
      });
    }
    searchInput?.addEventListener('input',()=>updateVisibility());
    clearBtn?.addEventListener('click',()=>{
      Object.values(storeSelected).forEach(set=>set.clear());
      document.querySelectorAll('[data-filter-group] .chip.active').forEach(btn=>btn.classList.remove('active'));
      renderActiveFilters();
      updateVisibility();
    });
    presetGrid?.addEventListener('click',(e)=>{
      const actionBtn=e.target.closest('[data-action]');
      if(!actionBtn) return;
      const id=Number(actionBtn.dataset.id);
      if(actionBtn.dataset.action==='copy'){
        e.preventDefault();
        e.stopPropagation();
        handleCopyPrompt(id,actionBtn);
      }
    });
    emptyState?.querySelector('.btn')?.addEventListener('click',(e)=>{
      e.preventDefault();
      sessionStorage.setItem('characterPreset',JSON.stringify({filters:Object.fromEntries(Object.entries(storeSelected).map(([k,v])=>[k,[...v]])),ts:Date.now(),action:'custom'}));
      location.href='image-generator.html';
    });
  }
});
