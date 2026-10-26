R("$('mgTitle').textContent='🟥 Mot mystère';","$('mgTitle').textContent='🟥 '+L('Mot mystère');")
R("""aria-label="Valider\"""","""aria-label="'+L('Valider')+'\"""")
R("""aria-label="Effacer\"""","""aria-label="'+L('Effacer')+'\"""",2)
R("""id="moLet">🔍 Lettre · ${COST.moLetter} 🪙</button><button class="btn" id="moClean">🧹 Clavier · ${COST.moClean} 🪙</button><button class="btn" id="moTry">➕ Essai · ${COST.moTry} 🪙</button></div>""",
  """id="moLet">🔍 ${L('Lettre')} · ${COST.moLetter} 🪙</button><button class="btn" id="moClean">🧹 ${L('Clavier')} · ${COST.moClean} 🪙</button><button class="btn" id="moTry">➕ ${L('Essai')} · ${COST.moTry} 🪙</button></div>""")
R("""id="moDone">Retour au jeu</button>""","""id="moDone">${L('Retour au jeu')}</button>""")
R("mgMsg('Toutes les lettres sont déjà connues')","mgMsg(L('Toutes les lettres sont déjà connues'))")
R("mgMsg('🔍 Une lettre révélée')","mgMsg(L('🔍 Une lettre révélée'))")
R("mgMsg('Le clavier est déjà propre')","mgMsg(L('Le clavier est déjà propre'))")
R("pay(COST.moClean,'nettoyer le clavier')","pay(COST.moClean,L('nettoyer le clavier'))")
R("mgMsg('🧹 6 lettres absentes grisées')","mgMsg(L('🧹 6 lettres absentes grisées'))")
R("pay(COST.moTry,'un essai en plus')","pay(COST.moTry,L('un essai en plus'))")
R("mgMsg('➕ Un essai en plus')","mgMsg(L('➕ Un essai en plus'))")
R("mgMsg(`Mot ${mo.idx+1}/3 · ${w.length} lettres${mo.idx===2?' · 🧩 casse-tête':''}`)","mgMsg(L('Mot {0}/3',mo.idx+1)+' · '+L('{0} lettres',w.length)+(mo.idx===2?' · 🧩 '+L('casse-tête'):''))")
R("""Dernier essai : <span class="r">${okN} bien placée${okN>1?'s':''}</span> · <span class="y">${misN} mal placée${misN>1?'s':''}</span>""",
  """${L('Dernier essai :')} <span class="r">${L(okN>1?'{0} bien placées':'{0} bien placée',okN)}</span> · <span class="y">${L(misN>1?'{0} mal placées':'{0} mal placée',misN)}</span>""")
R("""<p class="mzhelp">Mot ${mo.idx+1}/3 · essai ${Math.min(mo.max,mo.rows.length+1)}/${mo.max} · <span class="leg ok"></span> bien placé · <span class="leg mis"></span> mal placé</p>""",
  """<p class="mzhelp">${L('Mot {0}/3',mo.idx+1)} · ${L('essai {0}/{1}',Math.min(mo.max,mo.rows.length+1),mo.max)} · <span class="leg ok"></span> ${L('bien placé')} · <span class="leg mis"></span> ${L('mal placé')}</p>""")
R("mgMsg(`Il faut ${mo.w.length} lettres`)","mgMsg(L('Il faut {0} lettres',mo.w.length))")
R("mgMsg(`Bravo ! Trouvé en ${mo.rows.length} essai${mo.rows.length>1?'s':''} · ${rw}`)","mgMsg(L(mo.rows.length>1?'Bravo ! Trouvé en {0} essais':'Bravo ! Trouvé en {0} essai',mo.rows.length)+' · '+rw)")
R("mgMsg('Perdu ! Le mot était '+mo.w)","mgMsg(L('Perdu ! Le mot était {0}',mo.w))")
R("""<p>${type==='maze'?(score?'Tu es sorti du temple !':'Le chrono a gagné cette fois.'):score===total?'Sans faute ! Bonus parfait : +1 💣 et +1 ↶ en plus.':score>=total/2?'Bien joué !':'Tu feras mieux à la prochaine manche !'}</p>""",
  """<p>${type==='maze'?(score?L('Tu es sorti du temple !'):L('Le chrono a gagné cette fois.')):score===total?L('Sans faute ! Bonus parfait : +1 💣 et +1 ↶ en plus.'):score>=total/2?L('Bien joué !'):L('Tu feras mieux à la prochaine manche !')}</p>""")
R("""<p>Gagné depuis le début de la pause : <b>+${mg.won.bomb} 💣</b> et <b>+${mg.won.undo} ↶</b>${mg.practice?' (pour ta prochaine partie)':''}</p>""",
  """<p>${L('Gagné depuis le début de la pause : {0} et {1}','<b>+'+mg.won.bomb+' 💣</b>','<b>+'+mg.won.undo+' ↶</b>')}${mg.practice?' '+L('(pour ta prochaine partie)'):''}</p>""")
R("""id="mgAgain">🔁 Encore une manche · niveau ${nd}/5</button>""","""id="mgAgain">🔁 ${L('Encore une manche')} · ${L('niveau {0}/5',nd)}</button>""")
R("""id="mgOther">🎲 Changer de jeu</button>""","""id="mgOther">🎲 ${L('Changer de jeu')}</button>""")
R("""${mg.practice?'Retour au menu':'▶ Reprendre la partie'}""","""${mg.practice?L('Retour au menu'):L('▶ Reprendre la partie')}""")
R("openShop(`Il te manque ${n-coins} 🪙 pour ${what}.`)","openShop(L('Il te manque {0} 🪙 pour {1}.',n-coins,what))")
R("$('adReward').textContent='Récompense : '+text","$('adReward').textContent=L('Récompense : {0}',text)")
R("<span>Tes pièces</span>","<span>${L('Tes pièces')}</span>")
R("""<b>Pièces gratuites</b><span>${left>0?`Regarde une pub : +${AD_COINS} 🪙 (encore ${left} aujourd'hui)`:'Reviens demain pour d\\'autres pièces gratuites'}</span>""",
  """<b>${L('Pièces gratuites')}</b><span>${left>0?L("Regarde une pub : +{0} 🪙 (encore {1} aujourd'hui)",AD_COINS,left):L("Reviens demain pour d'autres pièces gratuites")}</span>""")
R("""<b>À quoi servent les pièces ?</b><span>💣 Bombe ${COST.bomb} · ↶ Retour ${COST.undo} · Continuer après une défaite ${COST.cont}</span><span>Jeux bonus : lettres, 50/50, temps en plus, boussole, essai en plus…</span>""",
  """<b>${L('À quoi servent les pièces ?')}</b><span>💣 ${L('Bombe')} ${COST.bomb} · ↶ ${L('Retour')} ${COST.undo} · ${L('Continuer après une défaite')} ${COST.cont}</span><span>${L('Jeux bonus : lettres, 50/50, temps en plus, boussole, essai en plus…')}</span>""")
R("""<p class="shopnote">Les prix sont en euros, TTC. Les achats sont facultatifs : tout le jeu se joue sans payer.</p>""","""<p class="shopnote">${L('Les achats sont facultatifs : tout le jeu se joue sans payer.')}</p>""")
R("n.textContent='Gagne des pièces en jouant, avec le cadeau du jour, les défis et les jeux bonus.'","n.textContent=L('Gagne des pièces en jouant, avec le cadeau du jour, les défis et les jeux bonus.')")
R("""<h3>Cadeau du jour</h3><p>Reviens chaque jour pour des cadeaux de plus en plus gros. Un jour manqué, et le calendrier repart au jour 1.</p>""",
  """<h3>${L('Cadeau du jour')}</h3><p>${L('Reviens chaque jour pour des cadeaux de plus en plus gros. Un jour manqué, et le calendrier repart au jour 1.')}</p>""")
R("<span>J${i+1}</span>","<span>${L('J{0}',i+1)}</span>")
R("""id="dGet">Récupérer ${DAILY[streak-1]} 🪙</button>""","""id="dGet">${L('Récupérer {0}',DAILY[streak-1])} 🪙</button>""")
R("const WORDS={","const WORDS_FR={")
R("const QUIZ={","const QUIZ_FR={")
for t in "45":
    R("WORDS[%s]="%t,"WORDS_FR[%s]="%t); R("QUIZ[%s]="%t,"QUIZ_FR[%s]="%t)
R("const usedW=","const WORDS=(I18N[LANG]&&I18N[LANG].WORDS)||WORDS_FR, QUIZ=(I18N[LANG]&&I18N[LANG].QUIZ)||QUIZ_FR;\nconst usedW=")
R("$('tryBonus').onclick=()=>openChooser(1,true);",
  """$('tryBonus').onclick=()=>openChooser(1,true);
// choix de la langue (écran d'accueil)
$('langBtn').textContent='🌐 '+LANGS[LANG];
$('langBtn').onclick=()=>{$('langList').hidden=!$('langList').hidden};
$('langList').innerHTML=Object.entries(LANGS).map(([c,n])=>`<button class="btn ${c===LANG?'':'ghost'}" data-lang="${c}">${n}</button>`).join('');
$('langList').querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{if(b.dataset.lang!==LANG)setLang(b.dataset.lang);else $('langList').hidden=true});""")
R("\n(function(){\n","\n(function(){\ni18nStatic();\n")
