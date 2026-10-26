# Correctif (bug existant) : si le joueur quitte le quiz juste après avoir répondu et lance un autre mini-jeu,
# le passage automatique à la question suivante ne doit pas s'exécuter dans le nouveau jeu.
R("if(!mg)return;mg.qi++","if(!mg||mg.type!=='quiz')return;mg.qi++",2)
