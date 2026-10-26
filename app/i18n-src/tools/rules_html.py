H=[('<span>Score</span>','<span data-l>Score</span>'),('<span>Niveau</span>','<span data-l>Niveau</span>'),('<span>Lignes</span>','<span data-l>Lignes</span>'),
 ('<span class="tag">Défi</span>','<span class="tag" data-l>Défi</span>'),('<small>Réserve</small>','<small data-l>Réserve</small>'),('<small>Suivante</small>','<small data-l>Suivante</small>'),
 ('<small>Bombe 💣</small>','<small data-l>Bombe 💣</small>'),('<small>Retour ↶</small>','<small data-l>Retour ↶</small>'),
 ('<p id="best">Record : 0</p>','<p id="best"></p>'),
 ('<button class="btn" id="startBtn">Jouer</button>','<button class="btn" id="startBtn" data-l>Jouer</button>'),
 ('<button class="btn ghost" id="tryBonus">🎁 Essayer les jeux bonus</button>','<button class="btn ghost" id="tryBonus" data-l>🎁 Essayer les jeux bonus</button>\n        <button class="btn ghost" id="langBtn"></button>\n        <div id="langList" class="langlist" hidden></div>'),
 ('<p style="font-size:.78rem">Tous','<p style="font-size:.78rem" data-l>Tous'),
 ('<p>Publicité récompensée (simulation)</p>','<p data-l>Publicité récompensée (simulation)</p>'),('<div class="fake">Votre pub ici</div>','<div class="fake" data-l>Votre pub ici</div>'),
 ('<p id="adReward">Récompense : 4 lignes du bas effacées</p>','<p id="adReward"></p>'),
 ('<div class="mg-title" id="mgTitle">Pause bonus</div>','<div class="mg-title" id="mgTitle"></div>'),
 ('<div class="shop-head"><span>Boutique</span>','<div class="shop-head"><span data-l>Boutique</span>'),
 ('<b>PUB</b>Emplacement bannière','<b data-l>PUB</b><span data-l>Emplacement bannière</span>'),
]
for o,n in H:
    c=html_head.count(o)
    if c!=1: fails.append((c,1,'HTML '+o[:60]))
    html_head=html_head.replace(o,n)
html_head=html_head.replace('<li><b>','<li data-l><b>')
k=html_head.rfind('</style>')
html_head=html_head[:k]+'#langBtn{display:block;margin:8px auto 0;padding:6px 16px;font-size:.85rem;background:rgba(0,212,255,.18);color:var(--deep);box-shadow:none;text-shadow:none;font-family:var(--ui);font-weight:600}.langlist{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:6px}.langlist .btn{flex:1 1 40%;margin:0;padding:8px;font-size:.9rem}\n'+html_head[k:]
