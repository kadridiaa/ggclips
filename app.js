const clips = [
  { id: 1, title: 'Il a vraiment tenté ça ?', creator: 'Noxx', initial: 'N', category: 'Drôle', tags: ['Drôle', 'Surprise'], time: 'Il y a 12 min', duration: '0:18', views: '12,4 k', art: 'art-1', scene: 'LE PLAN PARFAIT…' },
  { id: 2, title: 'Le dernier virage était de trop', creator: 'MilaRush', initial: 'M', category: 'Fails', tags: ['Fails', 'Course'], time: 'Il y a 28 min', duration: '0:24', views: '8,2 k', art: 'art-2', scene: 'OUPS.' },
  { id: 3, title: 'Personne ne l’avait vu venir', creator: 'KyoLive', initial: 'K', category: 'Action', tags: ['Action', 'Inattendu'], time: 'Il y a 41 min', duration: '0:31', views: '6,7 k', art: 'art-3', scene: 'C’EST MAINTENANT.' },
  { id: 4, title: 'Un clutch à la dernière seconde', creator: 'LunaByte', initial: 'L', category: 'Moment clutch', tags: ['Moment clutch', 'GG'], time: 'Il y a 1 h', duration: '0:22', views: '5,9 k', art: 'art-4', scene: 'UNE SECONDE.' },
  { id: 5, title: 'Le chat en roue libre', creator: 'SoraGG', initial: 'S', category: 'Drôle', tags: ['Drôle', 'Chat'], time: 'Il y a 2 h', duration: '0:16', views: '4,1 k', art: 'art-5', scene: 'LE CHAT : 😭' },
  { id: 6, title: 'La sortie la plus chaotique', creator: 'Rexouille', initial: 'R', category: 'Action', tags: ['Action', 'Chaos'], time: 'Il y a 3 h', duration: '0:27', views: '3,8 k', art: 'art-6', scene: 'TOUT SOUS CONTRÔLE.' },
];

const drafts = [
  { id: 7, title: 'La fuite improvisée du siècle', creator: 'Noxx', initial: 'N', category: 'Drôle', tags: ['Drôle', 'Évasion'], time: 'À l’instant', duration: '0:21', views: '0', art: 'art-2', scene: 'PLAN B : COURIR.', reason: 'Le chat s’emballe et la scène se comprend sans contexte supplémentaire.' },
  { id: 8, title: 'Un détour qui tourne mal', creator: 'MilaRush', initial: 'M', category: 'Fails', tags: ['Fails', 'Course'], time: 'À l’instant', duration: '0:17', views: '0', art: 'art-5', scene: 'MAUVAISE SORTIE.', reason: 'Chute comique courte, avec une réaction claire du streamer.' },
  { id: 9, title: 'Sauvetage à la dernière seconde', creator: 'KyoLive', initial: 'K', category: 'Moment clutch', tags: ['Moment clutch', 'Sauvetage'], time: 'À l’instant', duration: '0:29', views: '0', art: 'art-4', scene: 'JUSTE À TEMPS.', reason: 'Moment de tension et résolution immédiate, adapté au format court.' },
];

const grid = document.querySelector('#clip-grid');
const search = document.querySelector('#search');
const emptyState = document.querySelector('#empty-state');
const toast = document.querySelector('#toast');
const viewer = document.querySelector('#clip-viewer');
const profile = document.querySelector('#streamer-profile');
const loginPage = document.querySelector('#login-page');
const reviewDesk = document.querySelector('#review-desk');
const platformByStreamer = { Noxx: 'Twitch', MilaRush: 'Kick', KyoLive: 'Twitch', LunaByte: 'Kick', SoraGG: 'Twitch', Rexouille: 'Kick' };
const reservedClipId = 6;
let isDemoLoggedIn = false;
let activeFilter = 'Tout';
let toastTimer;

function renderClips() {
  const term = search.value.trim().toLocaleLowerCase('fr');
  const results = clips.filter((clip) => {
    const matchesFilter = activeFilter === 'Tout' || clip.tags.includes(activeFilter);
    const searchable = `${clip.title} ${clip.creator} ${clip.tags.join(' ')}`.toLocaleLowerCase('fr');
    return matchesFilter && searchable.includes(term);
  });
  grid.innerHTML = results.map((clip) => `
    <article class="clip-card" data-clip="${clip.id}">
      <div class="clip-visual">
        <div class="clip-art ${clip.art}" aria-hidden="true"><span class="art-glow"></span><span class="art-silhouette"></span></div>
        <div class="visual-top"><span class="demo-badge">${clip.id === reservedClipId ? '✦ RÉSERVÉ AUX MEMBRES' : '✦ DÉMO FICTIVE'}</span><span class="duration">${clip.duration}</span></div>
        <button class="play-button" type="button" aria-label="Aperçu fictif : ${clip.title}" data-action="preview">▶</button>
        <div class="visual-caption">${clip.scene}</div>
        ${clip.id === reservedClipId && !isDemoLoggedIn ? '<button class="member-lock" type="button" data-action="unlock"><span>▣</span><strong>Réservé aux membres</strong><small>Connecte-toi pour voir ce clip</small></button>' : ''}
      </div>
      <div class="clip-meta">
        <span class="avatar" style="--avatar:${avatarColor(clip.id)}" aria-hidden="true">${clip.initial}</span>
        <div class="creator"><button class="creator-link" type="button" data-streamer="${clip.creator}">${clip.creator}</button><span>${clip.time} · ${clip.views} vues</span></div>
        <div class="clip-actions">
          <button class="action-button" type="button" aria-label="Aimer ${clip.title}" data-action="like">♡ ${compactViews(clip.id)}</button>
          <button class="action-button" type="button" aria-label="Partager ${clip.title}" data-action="share">↗</button>
        </div>
      </div>
      <div class="clip-tags">${clip.tags.map((tag) => `<span class="clip-tag">#${tag.toLocaleLowerCase('fr').replaceAll(' ', '')}</span>`).join('')}</div>
    </article>`).join('');
  emptyState.hidden = results.length > 0;
  document.querySelector('#clip-count').textContent = String(results.length).padStart(2, '0');
}

function renderReviewDesk() {
  document.querySelector('#draft-list').innerHTML = drafts.map((draft) => `
    <article class="draft-card" data-draft="${draft.id}">
      <div class="draft-topline"><span class="draft-status"><i></i> BROUILLON</span><span class="draft-agent">✦ PROPOSÉ PAR L’AGENT</span></div>
      <h3>${draft.title}</h3>
      <div class="draft-facts"><span><small>STREAMER</small><strong>${draft.creator}</strong></span><span><small>DURÉE</small><strong>${draft.duration}</strong></span></div>
      <div class="draft-reason"><span>RAISON PROPOSÉE</span><p>${draft.reason}</p></div>
      <div class="draft-actions"><button class="draft-approve" type="button" data-decision="approve" data-draft-id="${draft.id}">✓ Valider</button><button class="draft-reject" type="button" data-decision="reject" data-draft-id="${draft.id}">× Refuser</button></div>
    </article>`).join('');
  document.querySelector('#review-empty').hidden = drafts.length > 0;
  document.querySelector('#review-count').textContent = drafts.length;
  document.querySelector('#review-count').hidden = drafts.length === 0;
}

function avatarColor(id) { return ['#d9b0ff', '#9be2d8', '#ffc27e', '#b6e985', '#f4a9c9', '#f0ca80'][(id - 1) % 6]; }
function compactViews(id) { return ['1.2k', '864', '720', '593', '411', '328'][id - 1] || '0'; }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelector('#filter-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter === 'Pour toi' ? 'Tout' : button.dataset.filter;
  document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('selected', chip === button));
  renderClips();
});
search.addEventListener('input', renderClips);
document.querySelector('#sort-button').addEventListener('click', () => showToast('Les clips sont déjà classés du plus récent au plus ancien.'));
grid.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const clip = clips.find((item) => item.id === Number(button.closest('[data-clip]').dataset.clip));
  if (clip.id === reservedClipId && !isDemoLoggedIn) {
    openLogin();
    return;
  }
  if (button.dataset.action === 'preview') openViewer(clip);
  if (button.dataset.action === 'like') {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? `♥ ${compactViews(clip.id)}` : `♡ ${compactViews(clip.id)}`;
    button.style.color = button.classList.contains('liked') ? '#d69cff' : '';
  }
  if (button.dataset.action === 'share') {
    const url = new URL(`#clip-${clip.id}`, window.location.href).href;
    try { await navigator.clipboard.writeText(url); showToast('Lien de démonstration copié.'); }
    catch { showToast(`Lien de démonstration : ${url}`); }
  }
});

grid.addEventListener('click', (event) => {
  const streamerButton = event.target.closest('[data-streamer]');
  if (streamerButton) {
    event.stopPropagation();
    openProfile(streamerButton.dataset.streamer);
    return;
  }
  if (event.target.closest('button')) return;
  const card = event.target.closest('[data-clip]');
  if (!card) return;
  openViewer(clips.find((clip) => clip.id === Number(card.dataset.clip)));
});

function openViewer(clip) {
  if (clip.id === reservedClipId && !isDemoLoggedIn) {
    openLogin();
    return;
  }
  document.querySelector('#viewer-art').className = `viewer-art clip-art ${clip.art}`;
  document.querySelector('#viewer-duration').textContent = clip.duration;
  document.querySelector('#viewer-scene').textContent = clip.scene;
  document.querySelector('#viewer-title').textContent = clip.title;
  const viewerCreator = document.querySelector('#viewer-creator');
  viewerCreator.textContent = clip.creator;
  viewerCreator.dataset.streamer = clip.creator;
  document.querySelector('#viewer-views').textContent = clip.views;
  document.querySelector('#viewer-likes').textContent = compactViews(clip.id);
  const avatar = document.querySelector('#viewer-avatar');
  avatar.textContent = clip.initial;
  avatar.style.setProperty('--avatar', avatarColor(clip.id));
  document.querySelector('#viewer-tags').innerHTML = clip.tags.map((tag) => `<span class="clip-tag">#${tag.toLocaleLowerCase('fr').replaceAll(' ', '')}</span>`).join('');
  viewer.hidden = false;
  viewer.setAttribute('aria-hidden', 'false');
  profile.hidden = true;
  profile.setAttribute('aria-hidden', 'true');
  loginPage.hidden = true;
  loginPage.setAttribute('aria-hidden', 'true');
  document.body.classList.add('viewer-open');
  document.querySelector('#back-to-feed').focus();
}

function openProfile(streamerName) {
  const streamerClips = clips.filter((clip) => clip.creator === streamerName);
  if (!streamerClips.length) return;
  const streamer = streamerClips[0];
  const avatar = document.querySelector('#profile-avatar');
  avatar.textContent = streamer.initial;
  avatar.style.setProperty('--avatar', avatarColor(streamer.id));
  document.querySelector('#profile-name').textContent = streamer.creator;
  document.querySelector('#profile-platform').textContent = platformByStreamer[streamer.creator];
  document.querySelector('#profile-count').textContent = streamerClips.length;
  document.querySelector('#profile-clips').innerHTML = streamerClips.map((clip) => `
    <button class="profile-clip" type="button" data-profile-clip="${clip.id}" aria-label="Ouvrir le clip : ${clip.title}">
      <span class="profile-clip-art clip-art ${clip.art}" aria-hidden="true"><span class="art-glow"></span><span class="art-silhouette"></span><span class="duration">${clip.duration}</span></span>
      <span class="profile-clip-copy"><strong>${clip.title}</strong><span>${clip.views} vues · ${compactViews(clip.id)} likes</span><span class="profile-tags">${clip.tags.map((tag) => `#${tag.toLocaleLowerCase('fr').replaceAll(' ', '')}`).join(' ')}</span></span>
      <span class="profile-clip-arrow" aria-hidden="true">↗</span>
    </button>`).join('');
  viewer.hidden = true;
  viewer.setAttribute('aria-hidden', 'true');
  profile.hidden = false;
  profile.setAttribute('aria-hidden', 'false');
  document.body.classList.add('viewer-open');
  document.querySelector('#profile-back').focus();
}

function closeViewer() {
  viewer.hidden = true;
  viewer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('viewer-open');
}

function openLogin() {
  viewer.hidden = true;
  viewer.setAttribute('aria-hidden', 'true');
  profile.hidden = true;
  profile.setAttribute('aria-hidden', 'true');
  loginPage.hidden = false;
  loginPage.setAttribute('aria-hidden', 'false');
  document.body.classList.add('viewer-open');
  document.querySelector('#demo-email').focus();
}

function closeLogin() {
  loginPage.hidden = true;
  loginPage.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('viewer-open');
}

function openReviewDesk() {
  viewer.hidden = true;
  viewer.setAttribute('aria-hidden', 'true');
  profile.hidden = true;
  profile.setAttribute('aria-hidden', 'true');
  loginPage.hidden = true;
  loginPage.setAttribute('aria-hidden', 'true');
  reviewDesk.hidden = false;
  reviewDesk.setAttribute('aria-hidden', 'false');
  renderReviewDesk();
  document.body.classList.add('viewer-open');
  document.querySelector('#review-back').focus();
}

function closeReviewDesk() {
  reviewDesk.hidden = true;
  reviewDesk.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('viewer-open');
}

function updateAuthControls() {
  document.querySelector('#login-open').hidden = isDemoLoggedIn;
  document.querySelector('#user-label').hidden = !isDemoLoggedIn;
  document.querySelector('#logout-button').hidden = !isDemoLoggedIn;
}

document.querySelector('#back-to-feed').addEventListener('click', closeViewer);
document.querySelector('#profile-back').addEventListener('click', () => {
  profile.hidden = true;
  profile.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('viewer-open');
});
document.querySelector('#login-open').addEventListener('click', openLogin);
document.querySelector('#login-back').addEventListener('click', closeLogin);
document.querySelector('#review-open').addEventListener('click', openReviewDesk);
document.querySelector('#review-back').addEventListener('click', closeReviewDesk);
document.querySelector('#draft-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-decision]');
  if (!button) return;
  const draftIndex = drafts.findIndex((draft) => draft.id === Number(button.dataset.draftId));
  if (draftIndex < 0) return;
  const [draft] = drafts.splice(draftIndex, 1);
  if (button.dataset.decision === 'approve') {
    clips.push({ ...draft, time: 'À l’instant' });
    activeFilter = 'Tout';
    search.value = '';
    document.querySelectorAll('.filter-chip').forEach((chip, index) => chip.classList.toggle('selected', index === 0));
    renderClips();
    showToast(`« ${draft.title} » ajouté au feed démo.`);
  } else {
    showToast(`« ${draft.title} » refusé et retiré des brouillons.`);
  }
  renderReviewDesk();
});
document.querySelector('#demo-login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  isDemoLoggedIn = true;
  event.currentTarget.reset();
  updateAuthControls();
  renderClips();
  closeLogin();
  showToast('Connexion démo activée. Le clip réservé est débloqué.');
});
document.querySelector('#logout-button').addEventListener('click', () => {
  isDemoLoggedIn = false;
  updateAuthControls();
  renderClips();
  closeViewer();
  profile.hidden = true;
  profile.setAttribute('aria-hidden', 'true');
  closeLogin();
  showToast('Déconnexion démo effectuée. Le clip est de nouveau verrouillé.');
});
document.querySelector('#viewer-creator').addEventListener('click', (event) => openProfile(event.currentTarget.dataset.streamer));
document.querySelector('#profile-clips').addEventListener('click', (event) => {
  const card = event.target.closest('[data-profile-clip]');
  if (card) openViewer(clips.find((clip) => clip.id === Number(card.dataset.profileClip)));
});
document.querySelector('#report-clip').addEventListener('click', () => showToast('Le signalement n’est pas activé dans ce prototype.'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !viewer.hidden) closeViewer();
  if (event.key === 'Escape' && !profile.hidden) {
    profile.hidden = true;
    profile.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('viewer-open');
  }
  if (event.key === 'Escape' && !loginPage.hidden) closeLogin();
  if (event.key === 'Escape' && !reviewDesk.hidden) closeReviewDesk();
});

const ageDialog = document.querySelector('#age-dialog');
if (!sessionStorage.getItem('ggclips-age-notice')) ageDialog.showModal();
document.querySelector('#age-confirm').addEventListener('click', () => {
  sessionStorage.setItem('ggclips-age-notice', 'seen');
  ageDialog.close();
});
document.querySelector('#age-leave').addEventListener('click', () => {
  ageDialog.close();
  showToast('Tu peux fermer cet onglet pour quitter le prototype.');
});
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault(); search.focus();
  }
});

renderClips();
renderReviewDesk();
updateAuthControls();
