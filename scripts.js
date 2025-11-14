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
  const path=(location.pathname||'').toLowerCase();
  const inject=(sel,html)=>{const el=document.querySelector(sel);if(el){el.insertAdjacentHTML('beforeend',html)}};
  if(path.endsWith('scenes.html')){
    const md1=document.querySelector('meta[name="description"]');
    if(md1){md1.setAttribute('content','自媒体短视频 AI 制作工具、教学动画制作软件（教师专用）、产品宣传动画 AI 制作（企业）、生日祝福与情侣纪念等个人娱乐，一站式自动动画生成。')}
    inject('#media',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>批量生产：1人1天产出20集系列动画；风格统一：IP角色全程一致；多类型适配：短视频/MV/剧情/搞笑全覆盖。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>二次元账号、知识类自媒体、生活类博主、音乐UP主。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入核心需求→选择场景模板→调整风格参数→生成成片，支持二次编辑。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看自媒体热门案例</a> · <a class="link" href="tools.html">使用IP角色库与批量生成工具</a></p><p><a class="btn btn-primary" href="beta.html">立即创作</a></p>'
    );
    inject('#edu',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>快速迭代：1小时产出5分钟教学动画；低门槛：教师一人即可完成；知识可视化：复杂知识点生动呈现。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>中小学教师、教育机构、科普博主、培训讲师。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入知识点→选择教育模板→设置语速与标注→生成成片，支持字幕与知识点标注。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看教育类案例</a> · <a class="link" href="tools.html">使用科普提示词模板与字幕工具</a></p><p><a class="btn btn-primary" href="beta.html">立即创作</a></p>'
    );
    inject('#biz',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>专业质感：1080p高清输出；快速交付：3天完成宣传动画；品牌统一：融入Logo与配色。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>企业市场部、品牌方、营销代理公司、产品经理。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>输入产品卖点→选择营销模板→上传品牌元素→生成成片，支持修改。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看营销案例</a> · <a class="link" href="enterprise.html">咨询定制方案</a></p><p><a class="btn btn-primary" href="beta.html">立即创作</a></p>'
    );
    inject('#fun',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>零门槛：3步生成动画；个性化：支持自定义角色与场景；快速分享：一键导出至社交平台。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>普通用户、情侣、家长、兴趣爱好者。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>选择娱乐模板→输入个性化信息→选择风格→生成成片并分享。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看娱乐类案例</a> · <a class="link" href="tools.html">使用个性化提示词生成器</a></p><p><a class="btn btn-primary" href="beta.html">立即创作</a></p>'
    );
    inject('#derivative',
      '<div class="cards">'
      +'<article class="card"><h3>核心亮点</h3><p>全链路支持：从角色到衍生品设计；高适配性：符合生产标准；批量设计：同一IP多类型同步设计。</p></article>'
      +'<article class="card"><h3>适用人群</h3><p>IP创作者、文创商家、品牌方、设计师。</p></article>'
      +'<article class="card"><h3>操作路径</h3><p>导入角色→选择衍生品类型→调整参数→生成设计图并下载。</p></article>'
      +'</div><p><a class="link" href="cases.html">查看衍生品设计案例</a> · <a class="link" href="tools.html">使用衍生品模板与3D建模工具</a></p><p><a class="btn btn-primary" href="beta.html">立即设计</a></p>'
    );
    inject('main','<section class="container section long-copy"><h2>如何为不同场景选择合适的 AI 动画方案</h2><p>创作场景的差异决定了 AI 动画的风格、镜头与节奏。对于自媒体短视频，我们更关注更新频率与系列内容的辨识度，建议使用 IP 角色库与批量模板来提升产能。对于教育场景，建议强化知识点标注与讲解逻辑，通过分镜师 Agent 将抽象概念拆解为易理解的镜头步骤。对于企业营销，重点在品牌统一与转化效果，应在艺术总监 Agent 中设置品牌色彩与线条规范，并选择适配投放平台的时长与字幕方案。对于个人娱乐与商业衍生，强调个性化与复用性，通过角色设计师与场景设计师建立可重复调用的视觉资产。</p><p>在自媒体场景中，使用“自媒体短视频 AI 制作工具”能够快速生成多风格内容。建议在提示词中明确账号调性与目标受众，如“二次元、治愈、日更”，并为每条内容设置 15–30 秒的时长与简单的镜头节奏。AI 动画制作将自动完成功能性工作，例如基础动作与转场，而创作者可以把精力放在选题与情绪表达上。自动动画生成与多智能体协同的结合，可以显著提升账号留存与增长。</p><p>在教育场景中，教师可通过“教学动画制作软件（教师专用）”的模板，以“知识点→分镜→讲解→字幕”的结构进行内容组织。分镜师 Agent 会为每个知识点配置镜头类型与时长，角色设计师与场景设计师提供视觉素材，动画师 Agent 实现镜头运动与动态合成，音效师 Agent 匹配清晰的旁白与适配的背景音乐。这样的 AI 动画创作流程既保证专业度，又保持低门槛，适合课堂演示与课件视频。</p><p>在企业营销中，市场团队可选择“产品宣传动画 AI 制作（企业）”方案。通过上传品牌元素与产品卖点，系统会自动生成品牌统一的脚本与分镜，并在动画师 Agent 的控制下形成专业成片。自动动画生成在 3 天内完成标准宣传片交付，并支持电商演示、品牌故事与培训视频等多种类型。AI 动画制作让营销节奏更快，投放更高效。</p><p>如果目标是个人娱乐，如“生日祝福动画制作 在线”“情侣纪念视频 AI 生成”，建议使用个性化模板与角色库，并在提示词中描述人物关系与情绪关键词（如“惊喜”“治愈”“可爱”）。系统会在艺术总监 Agent 的指导下为你选择合适的风格与色彩，在音效师 Agent 中匹配节日氛围的音乐与音效，最终形成具有仪式感的动画内容。</p><p>对于商业衍生，建议将角色与场景规范化存档，并在“商业衍生”版块中选择目标衍生品类型（海报、手办、抱枕等）。角色设计师与场景设计师将根据生产标准输出适配的设计图，动画师 Agent 提供动态预览，方便你在投产前确认风格与细节。这种“可复用资产 + 自动动画生成”的方法，有助于形成稳定的 IP 运营能力。</p></section>');
  }
  if(path.endsWith('tools.html')){
    const md2=document.querySelector('meta[name="description"]');
    if(md2){md2.setAttribute('content','动画提示词模板大全、短视频提示词模板、IP 角色描述词与提示词编写技巧（OiiOii.ai），AI 辅助创作更高效')}
    const html='<section class="container section">'
      +'<h2>提示词模板库</h2>'
      +'<div class="cards">'
      +'<article class="card"><h3>筛选</h3><p>场景/风格/难度多维筛选，复制即用。</p></article>'
      +'<article class="card"><h3>示例</h3><p>基础版·二次元美食短视频、进阶版·系列IP动画、基础版·儿童科普动画。</p></article>'
      +'</div><p><a class="link" href="beta.html">前往创作</a></p>'
      +'</section>'
      +'<section class="container section"><h2>提示词智能生成器</h2><p>输入场景+风格+时长，AI补充细节，生成专业提示词。</p></section>'
      +'<section class="container section"><h2>角色库</h2><p>热门角色直接用，系列创作不跑偏：圆脸兔子、小宇航员、孙悟空等。</p></section>'
      +'<section class="container section"><h2>风格预览器</h2><p>161种风格直观选择：日式二次元、3D低多边形、Lo‑Fi chibi等。</p></section>';
    inject('main',html);
  }
  if(path.endsWith('cases.html')){
    const md3=document.querySelector('meta[name="description"]');
    if(md3){md3.setAttribute('content','动画案例与成功案例：科普动画案例（教育机构）、二次元 MV 案例、企业宣传与培训视频案例，支持风格与时长筛选')}
    const html='<section class="container section">'
      +'<h2>热门案例</h2>'
      +'<div class="cards">'
      +'<article class="card"><h3>《西游记》恶搞短片</h3><p>场景：自媒体 | 风格：二次元 | 时长：30秒</p></article>'
      +'<article class="card"><h3>chiikawa音乐MV</h3><p>场景：自媒体 | 风格：Lo‑Fi chibi | 时长：45秒</p></article>'
      +'<article class="card"><h3>《太阳系科普》教学动画</h3><p>场景：教育 | 风格：Q版卡通 | 时长：5分钟</p></article>'
      +'</div><p class="note">按场景、风格、时长筛选查看更多案例。</p>'
      +'</section>';
    inject('main',html);
    const ld={"@context":"https://schema.org","@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"url":"https://oiianimation.com/cases.html#case1"},{"@type":"ListItem","position":2,"url":"https://oiianimation.com/cases.html#case2"}]};
    const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
    // 从 /oiivideo/ 目录加载视频并展示
    inject('main','<section class="container section"><h2>oiivideo 案例展示</h2><div id="video-grid" class="cards"></div></section>');
    (async()=>{
      try{
        const res=await fetch('/oiivideo/');
        const txt=await res.text();
        const hrefs=[...txt.matchAll(/href=\"([^\"]+\.(?:mp4|webm|mov))\"/gi)].map(m=>m[1]);
        const grid=document.getElementById('video-grid');
        if(grid&&hrefs.length){
          hrefs.forEach(fn=>{
            const name=decodeURIComponent(fn);
            const card=document.createElement('article');card.className='card';
            card.innerHTML='<h3>'+name+'</h3>'
              +'<video src="/oiivideo/'+fn+'" controls autoplay muted playsinline loop preload="none" style="width:100%;border-radius:12px"></video>'
              +'<p class="note">来源：oiivideo</p>';
            grid.appendChild(card);
          });
        }
      }catch(e){console.warn('加载 oiivideo 失败',e)}
    })();
  }
  if(path.endsWith('tutorials.html')){
    document.title='AI 动画制作教程 | 零基础入门与进阶技巧';
    const md4=document.querySelector('meta[name="description"]');
    if(md4){md4.setAttribute('content','如何制作动画（零基础入门）、AI 动画制作准备工作、提示词编写技巧（OiiOii.ai）、动画后期处理与导出分享、优化提升质量')}
    const html='<section class="container section"><h2>教程分类</h2><p>新手入门、进阶技巧、问题解答、工具教程。</p></section>'
      +'<section class="container section"><h2>热门教程</h2><div class="cards">'
      +'<article class="card"><h3>3分钟学会核心操作</h3><p>视频教程 | 3分钟</p></article>'
      +'<article class="card"><h3>提示词编写避坑指南</h3><p>图文教程 | 5分钟阅读</p></article>'
      +'<article class="card"><h3>角色一致性秘诀</h3><p>视频教程 | 6分钟</p></article>'
      +'</div></section>';
    inject('main',html);
    const ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"支持多长时长的动画生成？","acceptedAnswer":{"@type":"Answer","text":"当前支持5秒-60秒，后续开放更长时长。"}},{"@type":"Question","name":"如何修改生成的动画？","acceptedAnswer":{"@type":"Answer","text":"在二次编辑页面可修改角色、场景与音效。"}}]};
    const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
  }
  if(path.endsWith('beta.html')){
    const md5=document.querySelector('meta[name="description"]');
    if(md5){md5.setAttribute('content','OiiOii.ai 内测申请：抢先体验 7 大 Agent 协同动画创作，免费内测权限、提示词礼包与专属客服指导')}
    const html='<section class="container section"><h2>核心权益</h2><div class="cards">'
      +'<article class="card"><h3>免费内测权限</h3><p>解锁全部核心功能，无使用次数限制。</p></article>'
      +'<article class="card"><h3>100+提示词礼包</h3><p>复制即用，快速创作。</p></article>'
      +'<article class="card"><h3>专属客服指导</h3><p>1对1解答创作问题。</p></article>'
      +'</div></section>';
    inject('main',html);
    const ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"内测申请有门槛吗？","acceptedAnswer":{"@type":"Answer","text":"无明确门槛，有创作需求即可申请。"}},{"@type":"Question","name":"未收到激活邮件怎么办？","acceptedAnswer":{"@type":"Answer","text":"检查垃圾邮件或联系support@oiianimation.com。"}}]};
    const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
    inject('main','<section class="container section long-copy"><h2>为什么现在申请内测能够获得最大价值</h2><p>在 AI 动画制作的浪潮中，效率与质量的平衡是决定竞争力的关键。OiiOii.ai 通过 7 大 Agent 协同实现自动动画生成，让“从脚本到成片”的流程标准化、可复用与可度量。内测阶段我们开放全部核心功能与模板工具，并提供专属客服支持，帮助你在最短时间建立适合自己的创作范式。</p><p>申请内测的用户将获得“提示词礼包”“风格参考图包”“创作流程思维导图”等材料，这些素材能够显著缩短试错时间，帮助你快速从想法过渡到成片。在申请表中填写你的使用场景（自媒体、教育、企业或个人娱乐），我们会优先安排与你场景匹配的指引与素材，确保体验过程高效、顺畅。</p><p>无论你是“产品宣传动画 AI 制作（企业）”的市场团队，还是“教学动画制作软件（教师专用）”的教育用户，或是“自媒体短视频 AI 制作工具”的创作者，内测都能让你尽快掌握自动动画生成的关键方法，并在系列内容中建立风格统一与角色一致性的创作标准。现在就提交申请，抢占先机。</p></section>');
  }
  if(path.endsWith('enterprise.html')){
    const md6=document.querySelector('meta[name="description"]');
    if(md6){md6.setAttribute('content','产品宣传动画 AI 制作（企业）、品牌故事动画自动生成、培训视频快速制作与成本降低，支持 API 对接与定制方案')}
    const html='<section class="container section"><h2>解决方案</h2><div class="cards">'
      +'<article class="card"><h3>IP批量生产</h3><p>1人1周产出50集，角色一致性100%，成本降低90%。</p></article>'
      +'<article class="card"><h3>营销动画定制</h3><p>3天快速交付，品牌元素融入，转化率提升30%+。</p></article>'
      +'<article class="card"><h3>API对接服务</h3><p>无缝集成现有系统，实现动画自动化生成与分发。</p></article>'
      +'</div><h2>合作流程</h2><p>需求沟通→方案定制→签约合作→实施落地→后续服务。</p><p><a class="btn btn-primary" href="mailto:business@oiianimation.com">立即咨询合作</a></p>';
    inject('main',html);
    inject('main','<section class="container section long-copy"><h2>用 AI 动画打造增长型内容资产</h2><p>企业在营销内容与培训内容上的痛点，一是制作周期长、成本高，二是风格与品牌一致性难以保障，三是难以快速适配不同投放平台的节奏与格式。OiiOii.ai 的自动动画生成通过“艺术总监→编剧→分镜→角色→场景→动画→音效”的多智能体协同，将这些环节标准化，确保品牌主色、线条与字体规范贯穿始终，输出 1080p 高清与多语言字幕的专业成片。</p><p>在“产品宣传动画 AI 制作（企业）”方案中，我们建议依据“卖点拆解→场景设计→镜头节奏→音效匹配”的路径进行创作。编剧 Agent 将卖点转化为镜头可表达的语言，分镜师 Agent 设置镜头与转场，角色与场景设计师提供视觉素材，动画师 Agent 控制节奏与镜头运动，音效师 Agent 匹配品牌调性的音乐与音效。这样生成的企业动画不仅可用于电商、社媒与线下活动，也能复用到培训视频与产品演示之中。</p><p>若你需要规模化产能与跨团队协作，我们提供 API 对接服务，可将自动动画生成流程嵌入你的内容生产系统。通过模板化提示词与风格/角色档案库，营销与培训团队可以在既定标准内高效协作，确保不同批次与渠道的输出统一。现在就联系商务团队，获取适配你的业务目标的定制方案。</p></section>');
  }
  if(path.endsWith('membership.html')){
    const md7=document.querySelector('meta[name="description"]');
    if(md7){md7.setAttribute('content','会员权益：1080p/4K 输出、更多风格与自定义模型、角色库与生成次数升级、API 对接与专属服务，预约开通享首发优惠')}
    const html='<section class="container section"><h2>会员权益对比</h2><p>基础版（免费）/专业版（付费）/企业版（定制）：分辨率、风格数量、角色库、生成次数、二次编辑、API对接、专属服务逐级提升。</p><h2>预约开通</h2><p>留下邮箱，首发优惠第一时间通知。</p></section>';
    inject('main',html);
    const ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"会员体系什么时候上线？","acceptedAnswer":{"@type":"Answer","text":"预计2024年X月上线，以预约邮箱通知。"}},{"@type":"Question","name":"内测用户是否有会员优惠？","acceptedAnswer":{"@type":"Answer","text":"内测用户享首发7折优惠，并优先开通。"}}]};
    const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(ld);document.head.appendChild(s);
  }
  if(path.endsWith('community.html')){
    const md8=document.querySelector('meta[name="description"]');
    if(md8){md8.setAttribute('content','OiiOii 社区：作品展示、提示词交流、每日主题活动与社区规则，分享创作与获得灵感')}
    const html='<section class="container section"><h2>作品展示区</h2><p>上传作品，标注提示词与心得，优质作品可置顶。</p></section>'
      +'<section class="container section"><h2>提示词交流区</h2><p>分享优质提示词，适用场景与风格标注，支持点赞收藏与评论。</p></section>'
      +'<section class="container section"><h2>每日主题活动</h2><p>参与创作挑战，赢取内测高级权限与创作礼包。</p></section>'
      +'<section class="container section"><h2>社区规则</h2><p>禁止违法违规内容与抄袭，文明交流，违规处理分级。</p></section>';
    inject('main',html);
  }
});
