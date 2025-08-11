# 🐦 Flappy Bird — HTML/CSS/JavaScript

Un mini-clone de **Flappy Bird** en **HTML, CSS et JavaScript vanilla** : saute avec l’oiseau, passe entre les tuyaux, et bats ton record personnel !

## 🎮 Fonctionnalités

- 🖼 Arrière-plan **parallax**
- 🕹 Contrôles : clic/tap ou **Espace**
- 🧮 **Score en direct** + **meilleur score** (persisté via `localStorage`)
- ▶️ Écran **Start** (bouton Play)
- 💥 Écran **Game Over** (score, best, Try again)

## 🚀 Lancer le projet en local

1. Clone (ou télécharge) le projet :

```bash
git clone https://github.com/leonardo-correiamendes/flappybird.git
```

2. Ouvre **index.html** dans ton navigateur.  
   Aucun serveur ni dépendance n’est nécessaire.

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (animations, parallax)
- JavaScript (DOM, collisions, HUD, localStorage)

## 📂 Structure du projet

flappybird/
│
├── index.html              # Structure (HUD + overlays + jeu)
├── style.css               # Styles (parallax, tuyaux, overlays, HUD)
├── script.js               # Logique (saut, collisions, score, overlays)
├── img/
    ├── layer1.png          # Parallax: montagnes
    ├── layer2.png          # Parallax: nuages
    ├── flappy_frame_1.png  # Oiseau (ailes basses)
    └── flappy_frame_2.png  # Oiseau (ailes hautes)

## 🎯 Raccourcis & interactions

- Espace : démarrer une partie (si à l’arrêt) / sauter
- Clic/tap dans la fenêtre : sauter

## 🧩 Points clés d’implémentation

- Overlays :
  - #startOverlay (Play)
  - #gameOverOverlay (Try again)
- HUD : #hud affiche score et bestScore
- Best score (persistant) :
  let bestScore = parseInt(localStorage.getItem("bestScore")) || 0;
  localStorage.setItem("bestScore", bestScore);
- Reset propre au Game Over : recentrer l’oiseau, réinitialiser les tuyaux, mettre l’animation en pause, afficher l’overlay.

## ✨ Idées d’amélioration

- 📱 Contrôles mobile (zone de tap / bouton flottant)
- 🔊 Effets sonores (saut, score+, collision)
- 🌀 Plusieurs obstacles en simultané (scroll continu)
- 🏅 Médailles (bronze/argent/or) selon score
- 🌈 Skins (thèmes jour/nuit) & particules au saut

## 👤 Auteur

- **Leonardo CORREIA MENDES**
- Étudiant en informatique (BUT Informatique)

## ❤️ Remerciements

Merci à AsmrProg pour l'inspiration.
