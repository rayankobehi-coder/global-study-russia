// ==========================================
// GLOBAL STUDY RUSSIA - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    syncDefaultUniversityFromPage();
    initNavigation();
    initFilters();
    initStats();
    initMobileMenu();
    initScrollEffects();
    initProcedureTimeline();
    initFormulaireSafe();
    initPaysVilles();
});

function initProcedureTimeline() {
    const steps = document.querySelectorAll('.procedure-step');
    const detailTitle = document.getElementById('procedure-detail-title');
    const detailText = document.getElementById('procedure-detail-text');
    const detailNumber = document.querySelector('.procedure-detail-number');
    const progressBar = document.getElementById('procedure-progress-bar');
    const stepNumber = document.getElementById('procedure-step-number');
    const descriptions = [
        'Nous vous aidons à sélectionner une université et une filière adaptées à votre projet.',
        'Nous rassemblons les pièces nécessaires et construisons un dossier complet.',
        'Les documents sont traduits, certifiés et légalisés selon les exigences.',
        'Votre candidature est transmise et suivie auprès de l’université choisie.',
        'Nous suivons la réception de l’invitation officielle pour votre visa.',
        'Nous préparons votre demande et vous guidons dans les démarches consulaires.',
        'Nous vous aidons à préparer votre voyage et votre départ vers la Russie.',
        'Notre équipe vous accueille à l’aéroport et vous accompagne dès votre arrivée.',
        'Nous vous accompagnons pour votre installation dans votre logement.',
        'Vous êtes prêt à commencer votre parcours universitaire en Russie.'
    ];

    steps.forEach(step => step.addEventListener('click', () => {
        const current = Number(step.dataset.step);
        steps.forEach(item => {
            const active = Number(item.dataset.step) === current;
            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        detailTitle.textContent = step.querySelector('strong').textContent;
        detailText.textContent = descriptions[current - 1];
        detailNumber.textContent = String(current).padStart(2, '0');
        stepNumber.textContent = current;
        progressBar.style.width = `${current * 10}%`;
    }));
}

function getPageValue(id) {
    const element = document.getElementById(id);
    return element ? element.textContent.trim() : '';
}

function getUniversityPageValue(id, universityKey) {
    const element = document.getElementById(id);
    if (!element) return '';
    return element.dataset[universityKey] || element.textContent.trim();
}

function syncDefaultUniversityFromPage() {
    universityData.mgu.filieres = getPageValue('detail-filieres') || universityData.mgu.filieres;
    universityData.mgu.langue = getPageValue('detail-langue') || universityData.mgu.langue;
    universityData.mgu.duree = getPageValue('detail-duree') || universityData.mgu.duree;
    universityData.mgu.frais = getPageValue('detail-frais') || universityData.mgu.frais;
    universityData.mgu.hebergement = getPageValue('detail-hebergement') || universityData.mgu.hebergement;
    universityData.mgu.bourse = getPageValue('detail-bourse') || universityData.mgu.bourse;

    const rentree = document.querySelector('.rentree-banner span');
    if (rentree && rentree.textContent.trim()) {
        universityData.mgu.rentree = rentree.textContent.trim();
    }

    universityData.kubsu.name = getUniversityPageValue('detail-title', 'kubsu').replace('|', '\n');
    universityData.kubsu.breadcrumb = getUniversityPageValue('breadcrumb-name', 'kubsu');
    universityData.kubsu.location = getUniversityPageValue('detail-subtitle', 'kubsu');
    universityData.kubsu.filieres = getUniversityPageValue('detail-filieres', 'kubsu');
    universityData.kubsu.langue = getUniversityPageValue('detail-langue', 'kubsu');
    universityData.kubsu.duree = getUniversityPageValue('detail-duree', 'kubsu');
    universityData.kubsu.frais = getUniversityPageValue('detail-frais', 'kubsu');
    universityData.kubsu.hebergement = getUniversityPageValue('detail-hebergement', 'kubsu');
    universityData.kubsu.bourse = getUniversityPageValue('detail-bourse', 'kubsu');
    universityData.kubsu.depart = getPageValue('detail-subtitle').includes('Krasnodar') ? 'Krasnodar' : universityData.kubsu.depart;
    const kubsuStep = document.querySelector('.admission-step:nth-child(4) .step-content p');
    if (kubsuStep?.dataset.kubsu) universityData.kubsu.depart = kubsuStep.dataset.kubsu.replace(/^.*accueil à /, '').replace(/[.].*$/, '');
}

// ==========================================
// UNIVERSITY DATA
// ==========================================
const universityData = {
    mgu: {
        name: "MGU\nUniversité d'État de Moscou",
        breadcrumb: "MGU — Université d'État de Moscou",
        location: 'Moscou · Sciences, IT & ingénierie',
        filieres: 'Informatique, mathématiques, physique, aérospatiale, biologie, économie, droit',
        langue: 'Russe · quelques cursus en anglais',
        duree: 'Préparatoire 1 an · Licence 4 ans · Master 2 ans',
        frais: '2 000 000–3 000 000 FCFA / an hors bourse',
        hebergement: 'Résidence 170 000 FCFA / an · externe à partir de 20 000 FCFA / mois',
        bourse: 'Bourse gouvernementale : frais de scolarité couverts et accès à une résidence universitaire',
        rentree: 'Année préparatoire obligatoire pour les non-russophones',
        depart: 'Moscou'
    },
    kubsu: {
        name: "KubSU\nUniversité d'État du Kouban",
        breadcrumb: "KubSU — Université d'État du Kouban",
        location: 'Krasnodar · IT, gestion & sciences',
        filieres: 'IT, économie, tourisme, langues, biologie, design, droit, relations internationales',
        langue: 'Russe · département préparatoire pour étrangers',
        duree: 'Préparatoire 1 an · Licence 4 ans · Master 2 ans',
        frais: '1 000 000–2 000 000 FCFA / an hors bourse',
        hebergement: 'Cité U 10 000–33 000 FCFA / mois · externe 100 000–200 000 FCFA / mois',
        bourse: 'Bourse gouvernementale : frais de scolarité couverts, allocation et logement à tarif réduit',
        rentree: 'Département préparatoire : environ 800 000–1 000 000 FCFA / an hors bourse',
        depart: 'Krasnodar'
    }
};

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateToPage(page);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Discover universities button
    const btnDiscover = document.getElementById('btn-discover');
    if (btnDiscover) {
        btnDiscover.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('universites');
            updateNavActive('universites');
        });
    }

    // Back to universities
    const backBtn = document.getElementById('back-to-uni');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('universites');
            updateNavActive('universites');
        });
    }

    // Commencer ma candidature (page Accueil)
    const btnStartCandidature = document.getElementById('btn-start-candidature');
    if (btnStartCandidature) {
        btnStartCandidature.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('candidature');
            updateNavActive('candidature');
        });
    }

    // Déposer mon dossier (page Universités)
    const btnDeposer = document.getElementById('btn-deposer');
    if (btnDeposer) {
        btnDeposer.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('candidature');
            updateNavActive('candidature');
        });
    }
}

function navigateToPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const target = document.getElementById(pageName);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile menu
    closeMobileMenu();
}

function updateNavActive(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// ==========================================
// OPEN UNIVERSITY DETAIL
// ==========================================
function openUniDetail(uniKey) {
    const data = universityData[uniKey];
    if (!data) return;

    // Update content
    document.getElementById('breadcrumb-name').textContent = data.breadcrumb;
    document.getElementById('detail-title').innerHTML = data.name.replace('\n', '<br>');
    document.getElementById('detail-subtitle').textContent = data.location;
    document.getElementById('detail-filieres').textContent = data.filieres;
    document.getElementById('detail-langue').textContent = data.langue;
    document.getElementById('detail-duree').textContent = data.duree;
    document.getElementById('detail-frais').textContent = data.frais;
    document.getElementById('detail-hebergement').textContent = data.hebergement;
    document.getElementById('detail-bourse').textContent = data.bourse;

    // Update rentrée banner
    const rentreeBanner = document.querySelector('.rentree-banner span');
    if (rentreeBanner) {
        rentreeBanner.textContent = data.rentree;
    }

    // Update admission step 4
    const step4 = document.querySelectorAll('.step-content p');
    if (step4[3]) {
        step4[3].textContent = `Préparation au départ et accueil à ${data.depart}.`;
    }

    // Navigate to detail page
    navigateToPage('uni-detail');
    updateNavActive('universites');
}

// ==========================================
// FILTERS
// ==========================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const selectedFilters = {
        discipline: 'all',
        ville: 'all',
        langue: 'russe'
    };
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterGroup = btn.getAttribute('data-filter');
            selectedFilters[filterGroup] = btn.getAttribute('data-value');
            
            // Toggle within group
            const groupBtns = document.querySelectorAll(`.filter-btn[data-filter="${filterGroup}"]`);
            groupBtns.forEach(gb => gb.classList.remove('active'));
            btn.classList.add('active');
            filterUniversities(selectedFilters);

            // Add ripple effect
            addRippleEffect(btn);
        });
    });
}

function filterUniversities(selectedFilters) {
    document.querySelectorAll('.uni-card').forEach(card => {
        const matches = Object.entries(selectedFilters).every(([filter, value]) => {
            return value === 'all' || card.dataset[filter].split(' ').includes(value);
        });

        card.style.display = matches ? '' : 'none';
    });
}

function addRippleEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function initStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateToPage(page);
            updateNavActive(page);
            closeMobileMenu();
        });
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 29, 58, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(11, 29, 58, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.uni-card, .service-card, .step-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        scrollObserver.observe(el);
    });
}

// ==========================================
// SMOOTH PAGE TRANSITIONS
// ==========================================
function smoothTransition(callback) {
    document.body.style.opacity = '0.5';
    setTimeout(() => {
        callback();
        document.body.style.opacity = '1';
    }, 150);
}

// ==========================================
// FORM HANDLING - SUPABASE + WHATSAPP
// ==========================================
function initFormulaireSafe() {
    try {
        const form = document.getElementById('candidature-form');
        if (!form || !window.supabase) return;

        const SUPABASE_URL = 'https://fxtwqtrfhyescrszlrso.supabase.co';
        const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_TSfAl9l2NowqTZal0QOvVw_PsC5azvz';
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        const bucketName = 'global-study-russia-documents';
        const whatsappNumber = '2250173482777';
        const fichierLabels = [
            { id: 'file_passeport', label: 'Passeport' },
            { id: 'file_bac', label: 'Baccalauréat' },
            { id: 'file_licence', label: 'Licence (pour Master)' },
            { id: 'file_cv', label: 'CV' },
            { id: 'file_photo', label: "Photo d'identité" },
        ];

        const sanitizeFileName = (name) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]/g, '_');
        const getFileEntries = () => fichierLabels.map((definition) => {
            const input = document.getElementById(definition.id);
            const file = input?.files?.[0];
            return file ? { ...definition, file } : null;
        }).filter(Boolean);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('form-status');
            const submitBtn = document.getElementById('submit-btn');
            const originalButton = submitBtn.innerHTML;
            const formData = new FormData(form);
            const get = (name) => (formData.get(name) || '').toString().trim();
            const ville = get('ville') === 'Autre' || get('ville') === 'Autre / Non listée'
                ? (get('ville_autre') || get('ville'))
                : get('ville');
            const candidatureId = crypto.randomUUID();
            const files = getFileEntries();
            const documents = [];
            const whatsappWindow = window.open('about:blank', '_blank');

            statusDiv.className = 'form-status';
            statusDiv.textContent = '';
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Envoi des documents... <i class="fas fa-spinner fa-spin"></i>';

            try {
                for (const entry of files) {
                    const path = `candidatures/${candidatureId}/${entry.id}-${sanitizeFileName(entry.file.name)}`;
                    const { error: uploadError } = await supabaseClient.storage.from(bucketName).upload(path, entry.file, {
                        cacheControl: '3600',
                        contentType: entry.file.type || 'application/octet-stream',
                        upsert: false,
                    });
                    if (uploadError) throw uploadError;
                    documents.push({ field: entry.id, label: entry.label, name: entry.file.name, path, type: entry.file.type, size: entry.file.size });
                }

                submitBtn.innerHTML = 'Enregistrement... <i class="fas fa-spinner fa-spin"></i>';
                const rawForm = Object.fromEntries(formData.entries());
                delete rawForm.file_passeport;
                delete rawForm.file_bac;
                delete rawForm.file_licence;
                delete rawForm.file_cv;
                delete rawForm.file_photo;
                rawForm.ville = ville;

                const { error: insertError } = await supabaseClient.from('global_study_russia_candidatures').insert({
                    id: candidatureId,
                    nom: get('nom'),
                    prenom: get('prenom'),
                    date_naissance: get('date_naissance') || null,
                    sexe: get('sexe'),
                    nationalite: get('nationalite'),
                    email: get('email'),
                    telephone: get('telephone'),
                    whatsapp: get('whatsapp'),
                    pays: get('pays'),
                    ville,
                    niveau_actuel: get('niveau_actuel'),
                    diplome_obtenu: get('diplome_obtenu'),
                    specialite: get('specialite'),
                    universite_souhaitee: get('universite_souhaitee'),
                    filiere_souhaitee: get('filiere_souhaitee'),
                    message: get('message'),
                    documents,
                    raw_form: rawForm,
                    user_agent: navigator.userAgent,
                });
                if (insertError) throw insertError;

                submitBtn.innerHTML = 'Préparation de WhatsApp... <i class="fas fa-spinner fa-spin"></i>';
                const documentLines = [];
                for (const document of documents) {
                    const { data: signedData, error: signedError } = await supabaseClient.storage
                        .from(bucketName)
                        .createSignedUrl(document.path, 60 * 60 * 24 * 7);
                    if (signedError || !signedData?.signedUrl) {
                        documentLines.push(`- ${document.label} : ${document.name} (enregistré dans le dossier Supabase)`);
                    } else {
                        documentLines.push(`- ${document.label} : ${document.name}\n  Lien sécurisé valable 7 jours : ${signedData.signedUrl}`);
                    }
                }

                const lignes = [
                    'NOUVELLE CANDIDATURE — GLOBAL STUDY RUSSIA',
                    '',
                    `Nom : ${get('nom')}`,
                    `Prénom : ${get('prenom')}`,
                    `Date de naissance : ${get('date_naissance')}`,
                    `Sexe : ${get('sexe')}`,
                    `Nationalité : ${get('nationalite')}`,
                    `Email : ${get('email')}`,
                    `Téléphone : ${get('telephone')}`,
                    `WhatsApp : ${get('whatsapp')}`,
                    `Pays de résidence : ${get('pays')}`,
                    `Ville de résidence : ${ville}`,
                    `Niveau actuel : ${get('niveau_actuel')}`,
                    `Dernier diplôme obtenu : ${get('diplome_obtenu')}`,
                    `Spécialité actuelle : ${get('specialite')}`,
                    `Université souhaitée : ${get('universite_souhaitee')}`,
                    `Filière souhaitée : ${get('filiere_souhaitee')}`,
                    '',
                    'MESSAGE OU QUESTIONS SUPPLÉMENTAIRES :',
                    get('message') || '(Aucun message complémentaire)',
                    '',
                    'DOCUMENTS ENREGISTRÉS :',
                    ...(documentLines.length ? documentLines : ['Aucun document joint']),
                    '',
                    `Référence de candidature : ${candidatureId}`,
                    'Les informations et les fichiers ont été enregistrés dans Supabase.',
                ];
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lignes.join('\\n'))}`;
                if (whatsappWindow && !whatsappWindow.closed) {
                    whatsappWindow.location.href = whatsappUrl;
                } else {
                    window.location.href = whatsappUrl;
                }

                statusDiv.className = 'form-status success';
                statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Votre dossier est enregistré. WhatsApp s’ouvre avec toutes les informations et les liens des documents.';
                form.reset();
                const villeSelect = document.getElementById('ville');
                if (villeSelect) {
                    villeSelect.innerHTML = '<option value="">Sélectionnez d’abord un pays</option>';
                    villeSelect.disabled = true;
                }
                const villeAutre = document.getElementById('ville_autre');
                if (villeAutre) villeAutre.style.display = 'none';
            } catch (error) {
                if (whatsappWindow && !whatsappWindow.closed) whatsappWindow.close();
                console.error('Erreur d’envoi de candidature:', error);
                statusDiv.className = 'form-status error';
                statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> L’envoi a échoué. Vérifiez votre connexion et réessayez.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalButton;
            }
        });
    } catch (e) {
        console.error("Erreur lors de l'initialisation du formulaire:", e);
    }
}

// Make openUniDetail available globally
window.openUniDetail = openUniDetail;

// ==========================================
// PAYS & VILLES DYNAMIQUES
// ==========================================
function initPaysVilles() {
    const villesParPays = {
        'Cameroun': ['Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Ngaoundéré', 'Maroua', 'Bertoua', 'Ebolowa', 'Kribi', 'Limbé', 'Autre'],
        "Cote d'Ivoire": ['Abidjan', 'Bouaké', 'Korhogo', 'Daloa', 'San-Pédro', 'Man', 'Gagnoa', 'Yamoussoukro', 'Divo', 'Abengourou', 'Autre'],
        'Senegal': ['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Kaolack', 'Mbour', 'Diourbel', 'Tambacounda', 'Kolda', 'Matam', 'Autre'],
        'Mali': ['Bamako', 'Sikasso', 'Ségou', 'Mopti', 'Koutiala', 'Kayes', 'Gao', 'Kidal', 'Tombouctou', 'Autre'],
        'Burkina Faso': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya', 'Pouytenga', 'Kaya', 'Tenkodogo', 'Fada N\'Gourma', 'Autre'],
        'Togo': ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Dapaong', 'Tsévié', 'Aného', 'Bassar', 'Autre'],
        'Benin': ['Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon', 'Kandi', 'Natitingou', 'Autre'],
        'Gabon': ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda', 'Mouila', 'Lambaréné', 'Makokou', 'Autre'],
        'Congo': ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Impfondo', 'Ouesso', 'Madingou', 'Autre'],
        'RDC': ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Goma', 'Bukavu', 'Kisangani', 'Kananga', 'Bunia', 'Kolwezi', 'Autre'],
        'Guinee': ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé', 'Guéckédou', 'Mamou', 'Faranah', 'Autre'],
        'Autre': ['Autre / Non listée'],
    };

    const selectPays = document.getElementById('pays');
    const selectVille = document.getElementById('ville');
    const inputVilleAutre = document.getElementById('ville_autre');

    if (!selectPays || !selectVille) return;

    selectPays.addEventListener('change', () => {
        const pays = selectPays.value;
        // Vider les villes
        selectVille.innerHTML = '';

        if (!pays) {
            selectVille.innerHTML = '<option value="">Sélectionnez d\'abord un pays</option>';
            selectVille.disabled = true;
            if (inputVilleAutre) inputVilleAutre.style.display = 'none';
            return;
        }

        const villes = villesParPays[pays] || ['Autre / Non listée'];
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Sélectionner une ville';
        selectVille.appendChild(defaultOpt);

        villes.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v;
            opt.textContent = v;
            selectVille.appendChild(opt);
        });
        selectVille.disabled = false;
    });

    // Afficher le champ texte si "Autre"
    if (selectVille && inputVilleAutre) {
        selectVille.addEventListener('change', () => {
            const isAutre = selectVille.value === 'Autre' || selectVille.value === 'Autre / Non listée';
            inputVilleAutre.style.display = isAutre ? 'block' : 'none';
            inputVilleAutre.required = isAutre;
        });
    }

    // Désactiver la liste des villes au départ
    selectVille.disabled = true;
}