/* ==========================================================================
   PORTFOLIO CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update your portfolio.

   • Add a project ........ copy one block inside `projects: [ ... ]`
                            (projects appear in the order they are listed here)
   • Add a job ............ add a block to `experience: [ ... ]`
   • Add a certificate .... add a block to `certifications: [ ... ]`
   • Hide a section ....... leave its list empty: `[]`

   Rules that keep the site from breaking:
   1. Every item inside a list ends with a comma  →  { ... },
   2. Text goes inside "double quotes". Need a quote inside? Use \" or ’.
   3. Files live in /assets/… and are referenced like "assets/img/projects/my-image.jpg"
   4. Inside long text you can write **bold** and [link text](https://example.com).

   Project media (shown beside the project text, with tabs when there is more than one):
     media: [
       { type: "video",    src: "assets/video/demo.mp4", poster: "assets/img/projects/demo.jpg", label: "Demo video" },
       { type: "linkedin", id: "7367163744394612737",    label: "LinkedIn post" },   // number at the end of the post URL (…activity-<id>-…)
     ]

   • A project's FIRST local video plays silently inside its card while the card is on screen
     (and starts playing when the project is opened). Optional:  position: "left top"  = which part
     of the picture stays visible when the card crops it;  ratio: "1600 / 852"  = the video's width / height
     so the player fits it exactly.

   After saving, refresh the browser. If the page shows a red error box,
   you most likely missed a comma or a quote — the box tells you the line.
   ========================================================================== */

window.PORTFOLIO = {

  /* ------------------------------------------------------------------------
     SITE — the public address. Run  scripts/set-site-url.sh https://your-address
     to update the SEO tags, sitemap and robots.txt in one go.
     ------------------------------------------------------------------------ */
  site: {
    url: "https://moynuddin780.github.io/",
  },

  /* ------------------------------------------------------------------------
     PROFILE — shown in the header, hero, contact and footer
     ------------------------------------------------------------------------ */
  profile: {
    name: "Moynuddin Al Masum",
    role: "AI Engineer (Computer Vision)",
    photo: "assets/img/profile.jpg",
    location: "Dhaka, Bangladesh",
    availability: "AI Engineer at SmartData Technologies",   // set to "" to hide the green badge
    headline: "Building real-time computer-vision systems that run on live camera streams — from model training to deployment on edge NPUs.",
    resume: "assets/resume/Moynuddin-Al-Masum-Resume.pdf",
    email: "moinuddinmasum780@gmail.com",
    phone: "+880 1788 277470",                               // set to "" if you don’t want your number public
    socials: [
      // icon options: linkedin, github, leetcode, kaggle, scholar, x, youtube, medium, huggingface, link
      { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/moynuddin-al-masum-683102375" },
      { label: "GitHub",   icon: "github",   url: "https://github.com/Moynuddin780" },
      { label: "LeetCode", icon: "leetcode", url: "https://leetcode.com/u/All_iS_Well780/" },
    ],
  },

  /* Numbers under the hero. "auto:projects", "auto:publications" and
     "auto:accepted" count themselves. */
  stats: [
    { value: "auto:projects",     label: "AI projects built end to end" },
    { value: "4",                 label: "Systems running on a DX-M1 NPU" },
    { value: "auto:publications", label: "Research papers" },
    { value: "auto:accepted",     label: "Accepted for publication" },
  ],

  /* ------------------------------------------------------------------------
     ABOUT
     ------------------------------------------------------------------------ */
  about: {
    paragraphs: [
      "I’m an AI Engineer (Computer Vision) at **SmartData Technologies**. I build real-time vision systems that run on live camera streams, and I like owning the whole lifecycle — data, model, optimisation and deployment where people actually use it.",
      "Since joining as an intern in May 2026 and moving to a full-time role in September, I have built four systems on the **DEEPX DX-M1 NPU** in C++ and Docker: a face-recognition attendance engine for university classrooms, a hall-management platform with face-recognition gates and dining cameras, CCPLC, a bag-counting system for conveyor belts, and Smart Office, a multi-tenant office-analytics platform.",
      "Earlier work spans multi-object tracking and IN/OUT counting from RTSP streams, assistive navigation for visually impaired people, and retrieval-augmented chatbots. Alongside engineering I do applied research in medical AI, including a multi-agent vision-language framework for pediatric pneumonia diagnosis that has been accepted for publication.",
    ],
    facts: [
      { label: "Focus",     value: "Computer Vision · Edge AI · Generative AI" },
      { label: "Now",       value: "AI Engineer (Computer Vision), SmartData Technologies" },
      { label: "Education", value: "BSc, Information & Communication Engineering — BUP" },
      { label: "Based in",  value: "Dhaka, Bangladesh" },
    ],
  },

  /* ------------------------------------------------------------------------
     EXPERIENCE
     links: { certificate: "#internship-certificate" } opens the certificate viewer.
     ------------------------------------------------------------------------ */
  experience: [
    {
      role: "AI Engineer (Computer Vision)",
      company: "SmartData Technologies Limited",
      url: "",
      location: "Dhaka, Bangladesh · Full-time",
      period: "1 Sep 2026 — Present",
      points: [
        "Build and deploy real-time computer-vision systems on the **DEEPX DX-M1 NPU** — face-recognition attendance, hall management, conveyor bag counting and multi-tenant office analytics — using C++, GStreamer (VA-API GPU decoding) and Docker.",
        "Re-engineered the BUP face-attendance pipeline into a C++ NPU engine (rank-1 accuracy **92.8% → 99.0%**, 1.7× throughput, 3.1× less CPU) and built the **BUP Smart Hall**, **CCPLC** and **Smart Office** platforms end to end.",
      ],
      stack: ["C++17 / C++20", "DEEPX DX-M1 NPU", "SCRFD · ArcFace · YOLOv8", "GStreamer", "Docker", "React"],
      links: {},
    },
    {
      role: "AI Engineer Intern",
      company: "SmartData Technologies Limited",
      url: "",
      location: "Dhaka, Bangladesh · Internship",
      period: "1 May 2026 — 30 Aug 2026",
      points: [
        "Completed a 4-month internship in Artificial Intelligence Engineering (computer vision), then continued as a full-time AI Engineer from 1 September 2026.",
      ],
      stack: [],
      links: { certificate: "#internship-certificate" },
    },
  ],

  /* ------------------------------------------------------------------------
     PROJECTS — shown in the order written here (the last card spans the full width when the count is odd).
     id ........... unique, lowercase-with-dashes. Used in shareable links:
                    yoursite.com/#project-<id>   (the résumé links to some of these)
     category ..... the filter buttons are created from these automatically
     summary ...... 1–2 sentences on the card
     description .. longer text for the detail view
     highlights ... bullet points for the detail view
     metrics ...... real numbers, shown as tiles
     image ........ cover image shown on the card (when there is no media poster)
     media ........ videos / LinkedIn posts shown beside the text (see top of file)
     links ........ github / live / paper / … — a value is a URL, or { url, label }
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "bup-attendance",
      title: "Automatic Attendance System for University",
      category: "Computer Vision",
      year: "2025–26",
      summary: "Hands-free classroom attendance for Bangladesh University of Professionals — IP-CCTV cameras mark students present automatically, with the per-frame pipeline running as a C++ engine on the DEEPX DX-M1 NPU.",
      description: "Replaces manual roll-call. Students are enrolled once from photos; running classes are matched live from the classroom cameras, time-in-class is accumulated per student, and teachers and department admins get attendance, absent lists and history without lifting a finger. The demo video shows a live classroom run; the production system is a Flask web app with a C++ recognition engine on the NPU.",
      highlights: [
        "Per-camera C++ engine (pybind11): RTSP capture → SCRFD-10G face detection on the NPU → ArcFace recognition → cosine matching → attendance tracker → live overlay.",
        "Attendance rules: 60 s of presence = Present, a 2 s gap rule per camera, teacher manual override; role-based dashboards for super admin, department admin and teacher, with CSV/JSON export and cloud backup.",
        "Fixed accuracy bugs in the original pipeline — letterboxing instead of squashing 16:9 frames, SCRFD outputs bound by tensor name, anchor offset, L2-normalised enrollment averaging, Umeyama alignment.",
        "Reads camera sub-streams (≈10× cheaper to decode) and spreads NPU work over all 3 cores: 1.7× more frames per second per camera at 3.1× less CPU than the Python version.",
        "Ships as a Docker image (gunicorn, healthcheck, restart policy) with a Live Monitor page for every running class; running classes resume by themselves after a crash or reboot.",
      ],
      metrics: [
        { value: "99.0%", label: "rank-1 identification (was 92.8%)" },
        { value: "96.4%", label: "correct student marked (was 80.8%)" },
        { value: "0%",    label: "wrong students marked" },
        { value: "3.1×",  label: "less CPU than the Python version" },
      ],
      stack: ["C++14", "pybind11", "DEEPX DX-M1 NPU (DXRT)", "SCRFD-10G", "ArcFace", "OpenCV", "GStreamer", "Flask", "Docker", "RTSP / IP-CCTV"],
      image: "assets/img/projects/bup-attendance.jpg",
      media: [
        { type: "video",    src: "assets/video/bup-attendance-demo.mp4", poster: "assets/img/projects/bup-attendance.jpg", label: "Demo video", ratio: "848 / 478" },
        { type: "linkedin", id: "7367163744394612737", label: "LinkedIn post" },
      ],
      links: {
        github: { url: "https://github.com/Moynuddin780/Real-time-Face-Recognition-Attendance-System", label: "First prototype (source)" },
      },
    },
    {
      id: "smart-counting",
      title: "Real-time Object Detection & Smart Counting",
      category: "Computer Vision",
      year: "2026",
      summary: "Live video analytics on IP-CCTV streams — detects students and multiple vehicle types, tracks each one with a stable ID and counts IN/OUT movement in both directions.",
      description: "A production-oriented video analytics system that reads RTSP streams from IP-CCTV cameras, detects and tracks objects in real time, and keeps bidirectional IN/OUT counts — built for continuous, unattended monitoring.",
      highlights: [
        "Ingests live RTSP streams from IP-CCTV cameras for continuous monitoring.",
        "Custom-trained YOLOv8 model detects students and multiple vehicle classes.",
        "ByteTrack multi-object tracking keeps IDs stable across frames, enabling reliable bidirectional IN/OUT counting.",
        "GPU inference optimised with TensorRT for production-ready throughput.",
      ],
      metrics: [],
      stack: ["Ultralytics YOLOv8", "Custom YOLO model", "ByteTrack", "OpenCV", "RTSP streams", "TensorRT"],
      image: "assets/img/projects/smart-counting.jpg",
      media: [
        { type: "video", src: "assets/video/object-detection-demo.mp4", poster: "assets/img/projects/smart-counting.jpg", label: "Demo video", ratio: "1280 / 604", position: "left top" },
        { type: "linkedin", id: "7429574784050561025", label: "LinkedIn post" },
      ],
      links: {
        linkedin: "https://www.linkedin.com/posts/moynuddin-al-masum-683102375_computervision-yolo-objectdetection-activity-7429574784050561025-B5Sb",
      },
    },
    {
      id: "smart-office",
      title: "Smart Office — AI Office Analytics Platform",
      category: "Computer Vision",
      year: "2026",
      summary: "A multi-tenant office-analytics platform on the DX-M1 NPU — face-recognition attendance, restricted-zone alerts, fall detection, unauthorised-person detection and desk on-duty monitoring, with Telegram and e-mail alerts that carry the photo.",
      description: "Built like a SaaS product: the vendor provisions client companies, each company manages its own cameras, employees and reports, and no company can see another's data. Three models run in one C++ binary across all three NPU cores, five modules decide what happened, and the system says so when it cannot decide — for example when a camera is too far away to identify anybody.",
      highlights: [
        "**Five AI modules on one pipeline:** Attendance (first in, last out, every in / out pair, time inside, breaks, late / early / absent), Perimeter zones, Fall detection from 17 keypoints, Unauthorised person and Desk on-duty — fed by YOLO26-pose, SCRFD-10G and ArcFace MobileFaceNet.",
        "**Measured, not assumed:** `NPU_ALL` does not spread one engine over three cores, so every model is loaded once per core and jobs go round-robin — 71.8 → 186.4 inferences/s (**2.6×**). Software decode beat the board's hardware decoder by **33×** (223.5 vs 6.7 fps on a 640×360 sub-stream), and scaling before colour conversion took 1080p from 27.3 to 66.7 fps.",
        "**Alerts that carry the picture:** Telegram photos and e-mail with the image attached, sent through a retrying outbox — never text alone.",
        "**A face registry that checks itself:** one vector per person recomputed from every photo, with coherence and quality scores, duplicate-profile warnings and a guided 20-pose capture.",
        "**Multi-tenant security:** the tenant comes from the token, repositories take the tenant id as a mandatory first parameter (a forgotten filter does not compile), a SuperAdmin cannot browse inside a tenant, passwords use PBKDF2-HMAC-SHA512 at 210,000 iterations.",
        "**Production packaging:** Drogon API and a React + TypeScript dashboard with PostgreSQL behind nginx in Docker Compose; the image carries no NPU driver. 143 tests (1,887 assertions) run inside `docker build` and on the hardware.",
      ],
      metrics: [
        { value: "2.6×",  label: "NPU throughput with one engine per core (71.8 → 186.4 inf/s)" },
        { value: "33×",   label: "faster software decode than the board's hardware decoder" },
        { value: "5",     label: "AI modules from 3 models in one C++ binary" },
        { value: "143",   label: "automated tests, 1,887 assertions" },
      ],
      stack: ["C++17", "DEEPX DX-M1 NPU (DXRT)", "YOLO26-pose", "SCRFD-10G", "ArcFace MobileFaceNet", "GStreamer", "Drogon", "PostgreSQL 16", "React", "TypeScript", "Docker"],
      image: "assets/img/projects/smart-office.jpg",
      media: [
        { type: "video", src: "assets/video/smart-office-demo.mp4", poster: "assets/img/projects/smart-office.jpg", label: "Demo video", ratio: "1848 / 1006", position: "left top" },
      ],
      links: {},
    },
    {
      id: "smart-hall",
      title: "Smart Hall Management System",
      category: "Computer Vision",
      year: "2026",
      summary: "One C++ server that runs a university residential hall — face-recognition gate and dining cameras on the DX-M1 NPU, meal planning, kitchen and meal counter, complaints, notices and automatic monthly meal bills.",
      description: "Built for the residential halls of Bangladesh University of Professionals. Students plan meals from their own portal, the kitchen sees the final count, distributors serve by Meal ID, and the hall office gets gate movement logs, alerts and bills — all from a single C++20 process deployed as a Docker container.",
      highlights: [
        "**Smart Gate:** entry/exit cameras recognise students, save IN/OUT movement instantly, show who is inside, raise late-night alerts and export CSV.",
        "**Dining:** face-recognition dining cameras record who came to eat — or came without a meal switched on — next to served / absent / extra attendance reports and live meal counts.",
        "**Meal workflow:** students switch breakfast / lunch / dinner on or off until the 2:00 AM lock; the kitchen board shows how many meals to cook; the counter marks meals served by Meal ID with live ON / served / remaining / extra counts.",
        "**Hall office:** complaints (Pending → In process → Solved), notice board with PDF/image attachments, weekly food routine, and meal-rate and monthly-bill calculation with payments and dues.",
        "**Face pipeline:** SCRFD-10G detection → ByteTrack → ArcFace (w600k_r50, INT8) on the NPU. Tracking means 120 detections/s over 12 cameras needed only 22 ArcFace runs/s.",
        "**Production-ready:** Docker with host IPC/PID namespaces for DXRT, VA-API GPU decoding, shared RTSP connections, SQLite (WAL), CSRF-protected sessions, a health endpoint and black-box tests that drive the real server.",
      ],
      metrics: [
        { value: "99.9%",   label: "correct student ranked first (133 students, 1,907 photos)" },
        { value: "0.0%",    label: "non-enrolled people accepted" },
        { value: "11.1 ms", label: "per face on the NPU" },
        { value: "12",      label: "camera slots recognising at once" },
      ],
      stack: ["C++20", "DEEPX DX-M1 NPU (DXRT)", "SCRFD-10G", "ArcFace", "ByteTrack", "GStreamer · VA-API", "ONNX Runtime (CPU fallback)", "SQLite", "cpp-httplib", "Docker"],
      image: "assets/img/projects/smart-hall.jpg",
      media: [
        { type: "video", src: "assets/video/smart-hall-demo.mp4", poster: "assets/img/projects/smart-hall.jpg", label: "Demo video", ratio: "1600 / 824" },
      ],
      links: {},
    },
    {
      id: "ccplc",
      title: "CCPLC — AIoT Cement Bag Counting System",
      category: "Computer Vision",
      year: "2026",
      summary: "Counts cement bags on any number of conveyor belts from IP cameras, in real time on the DX-M1 NPU — and turns the counts into loading sessions, shift reports and LED displays.",
      description: "Camera streams are decoded at the edge, every frame goes through a YOLOv8s model on all three NPU cores, bags are tracked and counted when they enter an operator-drawn 3-D zone standing on the belt, and the counts are booked into loading sessions (vessel, shipment, PCC/OPC targets). Operators run everything from a React control-room dashboard; counting carries on even when no browser is open.",
      highlights: [
        "**C++17 backend:** GStreamer / VA-API GPU decoding with an FFmpeg fallback, asynchronous NPU inference, tracker, 3-D counting zone and sessions that survive restarts.",
        "**3-D counting zone:** a box standing on the belt, so bags riding above the surface are counted once when their centre enters it. Counts were identical with GPU and CPU decoding (109 / 109 on a sample video).",
        "**One WebSocket** carries the live annotated previews of every belt, so the dashboard never starves its own API calls; MJPEG and snapshot endpoints serve external viewers.",
        "**Loading sessions:** vessel, shipment, PCC / OPC targets, warning threshold and siren, shift reports (A / B / C) with CSV export, manual override with a remark, and a plain-text endpoint for LED count boards.",
        "**Camera setup in the browser:** reads vendor settings over ISAPI / ONVIF (resolution, codec), with RTT-scaled timeouts and exponential reconnect for slow plant networks.",
        "**Deployment:** multi-stage Docker build that runs the unit tests, nginx gateway, healthchecks, log rotation and an edge-health panel with CPU and NPU temperature and usage.",
      ],
      metrics: [
        { value: "197 fps",   label: "NPU capacity for the YOLOv8s model" },
        { value: "0 dropped", label: "frames, 4 live cameras at 20–25 fps" },
        { value: "109 / 109", label: "bags counted identically, GPU vs CPU decode" },
        { value: "~5×",       label: "less CPU on a sub-stream than a 2.5K main stream" },
      ],
      stack: ["YOLOv8s", "DEEPX DX-M1 NPU", "C++17", "GStreamer · VA-API", "OpenCV", "React 19", "Vite", "WebSocket", "REST API", "nginx", "Docker"],
      image: "assets/img/projects/ccplc.jpg",
      media: [
        { type: "video", src: "assets/video/ccplc-demo.mp4", poster: "assets/img/projects/ccplc.jpg", label: "Demo video", ratio: "1600 / 836" },
      ],
      links: {},
    },
    {
      id: "bup-rag-chatbot",
      title: "BUP RAG Chatbot",
      category: "Generative AI",
      year: "2025",
      summary: "A retrieval-augmented FAQ assistant for Bangladesh University of Professionals that answers questions accurately — in the language they were asked.",
      description: "Instead of letting an LLM guess, the chatbot first retrieves the most relevant official FAQs and then asks the model to answer from that context, keeping answers grounded and up to date.",
      highlights: [
        "Semantic search over university FAQs with SentenceTransformer embeddings and a FAISS index.",
        "Retrieved context is passed to Google Gemini to generate grounded, language-adaptive answers.",
        "Real-time chat interface built with Gradio.",
      ],
      metrics: [],
      stack: ["RAG", "FAISS", "SentenceTransformers", "Google Gemini API", "Gradio", "Python"],
      image: "assets/img/projects/bup-rag-chatbot.jpg",
      media: [
        { type: "video", src: "assets/video/bup-rag-chatbot-demo.mp4", poster: "assets/img/projects/bup-rag-chatbot.jpg", label: "Demo video", ratio: "1376 / 728", position: "left top" },
        { type: "linkedin", id: "7382755801192484864", label: "LinkedIn post" },
      ],
      links: {
        linkedin: "https://www.linkedin.com/posts/moynuddin-al-masum-683102375_ai-machinelearning-llm-activity-7382755801192484864-vZs0",
      },
    },
    {
      id: "linkedin-post-generator",
      title: "AI LinkedIn Post Generator",
      category: "Generative AI",
      year: "2025",
      summary: "Generates structured, professional LinkedIn posts on any topic in English, Bengali or Spanish through a simple web interface.",
      description: "A small LangChain application: pick a topic, a length and a language, and get a post that is ready to publish.",
      highlights: [
        "LangChain prompt pipeline on OpenAI GPT-4o-mini produces consistently structured 2–4 paragraph posts.",
        "Multi-language output (English, Bengali, Spanish) that is easy to extend.",
        "Gradio web UI, with API keys kept out of code via environment variables.",
      ],
      metrics: [],
      stack: ["LangChain", "OpenAI GPT-4o-mini", "Prompt engineering", "Gradio", "Python"],
      image: "assets/img/projects/linkedin-post-generator.jpg",
      media: [
        { type: "video", src: "assets/video/linkedin-post-generator-demo.mp4", poster: "assets/img/projects/linkedin-post-generator.jpg", label: "Demo video", ratio: "960 / 512", position: "left top" },
        { type: "linkedin", id: "7370021032008581120", label: "LinkedIn post" },
      ],
      links: {
        github: "https://github.com/Moynuddin780/AI-Agent-Linkedin-Post-Generator",
        linkedin: "https://www.linkedin.com/posts/moynuddin-al-masum-683102375_ai-openai-langchain-activity-7370021032008581120-INVM",
      },
    },
    {
      id: "people-flow",
      title: "People Flow Detection & Heatmap",
      category: "Computer Vision",
      year: "2025",
      summary: "Counts people entering and leaving an area with YOLOv8 + ByteTrack, and visualises where the crowd moves most as a heatmap.",
      description: "",
      highlights: [
        "YOLOv8 person detection with ByteTrack for persistent track IDs.",
        "Direction-aware IN/OUT counting from trajectory history across two virtual lines.",
        "Movement heatmap built from accumulated track centres with Gaussian smoothing.",
      ],
      metrics: [],
      stack: ["YOLOv8", "ByteTrack", "Supervision", "OpenCV", "Matplotlib"],
      image: "assets/img/projects/people-flow.jpg",
      media: [
        { type: "video", src: "assets/video/people-flow-demo.mp4", poster: "assets/img/projects/people-flow.jpg", label: "Demo video", ratio: "1280 / 720" },
        { type: "drive", id: "114zMo9fPXSdefMeZ36MK_LWaPr_xXwTn", label: "Full video (Google Drive)" },
      ],
      links: {
        github: "https://github.com/Moynuddin780/People-Flow-Detection-using-Object-Tracking",
      },
    },
    {
      id: "home-security",
      title: "Real-time AI Home Security System",
      category: "Computer Vision",
      year: "2026",
      summary: "Smart surveillance that recognises family members, flags unknown people, sounds an alarm and sends instant Telegram alerts with the intruder’s photo.",
      description: "A home-security pipeline that watches a webcam or IP camera, tells registered family members from strangers and escalates the moment an unknown person appears.",
      highlights: [
        "Real-time face recognition with InsightFace on webcam or IP-camera feeds.",
        "Separates registered family members from unknown persons.",
        "Triggers an audible alarm and pushes Telegram notifications with captured intruder photos.",
        "Multithreaded pipeline keeps capture, recognition and alerting responsive.",
      ],
      metrics: [],
      stack: ["InsightFace", "OpenCV", "Telegram Bot API", "Multithreading", "Python"],
      image: "",
      media: [],
      links: {
        github: "https://github.com/Moynuddin780/Real-Time-AI-Home-Security-System",
      },
    },
    {
      id: "blind-navigation",
      title: "Blind Navigation Hybrid AI System",
      category: "Computer Vision",
      year: "2025",
      summary: "Assistive navigation for visually impaired people — detects roads, obstacles, potholes and stairs, estimates distance, and gives continuous spoken guidance toward a destination.",
      description: "A hybrid computer-vision pipeline that merges object detection, depth estimation and walkable-area segmentation into prioritised voice instructions such as “Pothole ahead, stop!” or “Move slightly left”. Designed to run on mid-range hardware.",
      highlights: [
        "Pretrained YOLOv8 combined with custom-trained classes for footpaths, potholes, stairs, wet floors and construction obstacles.",
        "Monocular depth estimation (MiDaS / ZoeDepth) warns users when obstacles are close.",
        "Walkable-area segmentation to find the safest path forward.",
        "Voice interface: speech-to-text for commands, text-to-speech for real-time guidance.",
        "A logic engine merges detections, depth and route information into timely, prioritised instructions.",
      ],
      metrics: [],
      stack: ["YOLOv8", "Custom object detection", "MiDaS / ZoeDepth", "OpenCV", "Speech-to-Text", "Text-to-Speech", "Python"],
      image: "",
      media: [],
      links: {
        github: "https://github.com/Moynuddin780/Blind-Human-Navigation-Hybrid-AI-System",
      },
    },
  ],

  /* ------------------------------------------------------------------------
     EXPLAINER — a longer video with the idea written out next to it (its own section).
     video: src + poster (+ label, duration). Leave the list empty [] to hide the section.
     ------------------------------------------------------------------------ */
  explainers: [
    {
      id: "tracking-memorization",
      kicker: "Multi-object tracking",
      title: "Object detection with *memorization*",
      summary: "A detector only sees one frame at a time. To know that the person in frame 2 is the same person as in frame 1, the tracker has to remember each object — where it was, how fast it was moving and how big it is — and predict where it should appear next. This video walks through that idea with a worked example.",
      video: {
        src: "assets/video/tracking-memorization.mp4",
        poster: "assets/img/explainer-tracking.jpg",
        label: "Walk-through video",
        duration: "10 min",
        ratio: "1116 / 606",
      },
      steps: [
        { title: "Frame 1 — a track is born", text: "YOLO detects person A with confidence 0.85, above the 0.25 threshold, so a new track (P1) is created. The Kalman filter memorises its state: centre (125, 275), speed (0, 0), size 50 × 150." },
        { title: "Before Frame 2 — predict", text: "From what it remembers, the Kalman filter predicts where P1’s box should be in the next frame: [100, 200, 150, 350]." },
        { title: "Frame 2 — detect, then match", text: "YOLO returns several boxes. Each is compared with the predicted box using **IoU** (overlap ÷ union). Box A overlaps 2000 / 2500 = **0.80**, so it keeps ID P1. Box B overlaps only 300 / 1500 = **0.20**, so it cannot be P1 and gets a new ID, P2 (confidence 0.75 > 0.25). Box C (confidence 0.20) is below the threshold and does not start a track." },
        { title: "Before Frame 3 — update the memory", text: "The filter blends its prediction with the actual detection for every track: A’s position becomes (127.5, 277.5) with speed (5, 5), so its next box is predicted further along its path; B, which has not moved, stays where it is." },
        { title: "Frame 3 — repeat", text: "YOLO now sees A to E. The same predict → match → update loop runs on every frame, which is what keeps each person’s ID stable as they move." },
      ],
      note: "The same predict → match → update loop sits underneath the ByteTrack tracker used in [Smart Counting](#project-smart-counting) and [Smart Hall](#project-smart-hall).",
      tags: ["YOLO detection", "Kalman filter", "IoU matching", "Track IDs", "ByteTrack"],
    },
  ],

  /* Smaller experiments — shown as a compact list under the projects. */
  moreWork: [
    { title: "Heart Disease Prediction API", description: "Random-forest model served with FastAPI, containerised with Docker and deployed on Render.", tags: ["FastAPI", "Docker", "Scikit-learn"], url: "https://github.com/Moynuddin780/FastAPI-Docker-Deployment-Heart-Disease-Prediction-" },
    { title: "Sentiment Analysis: TF-IDF vs Word2Vec vs BERT", description: "Compares three text representations for review sentiment classification.", tags: ["NLP", "BERT", "Scikit-learn"], url: "https://github.com/Moynuddin780/Sentiment-Analysis-on-Product-Reviews" },
    { title: "PPE Compliance Detector", description: "Personal protective equipment compliance detection with YOLO11.", tags: ["YOLO11", "Computer Vision"], url: "https://github.com/Moynuddin780/PPE-Compliance-Detector-YOLO-V11-" },
    { title: "Image Classification: NN vs CNN", description: "Fully-connected networks compared against CNNs on image classification.", tags: ["Deep Learning", "CNN"], url: "https://github.com/Moynuddin780/Image-Classification-NN-vs-CNN" },
    { title: "BPL Win Predictor", description: "Match-outcome prediction for the Bangladesh Premier League.", tags: ["Machine Learning", "Pandas"], url: "https://github.com/Moynuddin780/Bangladesh-Premier-League-BPL--Win-Predictor" },
  ],

  /* ------------------------------------------------------------------------
     RESEARCH
     status: "Published" | "Accepted" | "Under review" | "Preprint" | "In preparation"
     ------------------------------------------------------------------------ */
  publications: [
    {
      title: "Multi-Agent Framework for Pediatric Pneumonia Diagnosis Integrating Vision and Language Models",
      status: "Accepted",
      venue: "",
      year: "",
      authors: "",
      summary: "A multi-agent framework that brings vision and language models together to support pediatric pneumonia diagnosis.",
      tags: ["Multi-agent systems", "Vision-language models", "Medical AI"],
      links: {},
    },
    {
      title: "A Hybrid Deep-Learning Framework with Interpretable Risk Scoring for Early Gestational Diabetes Prediction",
      status: "Under review",
      venue: "",
      year: "",
      authors: "",
      summary: "A hybrid deep-learning model paired with an interpretable risk score for the early prediction of gestational diabetes.",
      tags: ["Deep learning", "Interpretability", "Healthcare"],
      links: {
        code: "https://github.com/Moynuddin780/Gestational-Diabetes-Malitus-GDM-Paper",
      },
    },
  ],

  /* ------------------------------------------------------------------------
     EXPERTISE — each group becomes a card
     ------------------------------------------------------------------------ */
  skills: [
    {
      group: "Computer Vision",
      description: "Detection, tracking and recognition on live video.",
      items: ["OpenCV", "Ultralytics YOLOv8 / YOLO11", "ByteTrack", "InsightFace (SCRFD · ArcFace)", "MiDaS / ZoeDepth", "Supervision", "RTSP / IP-CCTV"],
    },
    {
      group: "Edge AI & Systems",
      description: "Making models fast and dependable on real hardware.",
      items: ["DEEPX DX-M1 NPU (DXRT · DX-COM)", "C++17 / C++20", "pybind11", "GStreamer · VA-API", "TensorRT", "ONNX Runtime", "CMake"],
    },
    {
      group: "Generative AI & NLP",
      description: "LLM apps grounded in real data.",
      items: ["LLMs", "RAG", "LangChain", "FAISS", "SentenceTransformers", "OpenAI API", "Google Gemini API", "Prompt engineering", "NLP"],
    },
    {
      group: "Machine & Deep Learning",
      description: "From classical ML to neural networks.",
      items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Neural networks", "Pandas", "NumPy", "Matplotlib"],
    },
    {
      group: "Backend & Deployment",
      description: "Shipping models people can use.",
      items: ["Python", "FastAPI", "Flask", "Docker · Compose", "nginx", "SQLite", "REST · WebSocket", "Git"],
    },
    {
      group: "Interfaces & Automation",
      description: "Dashboards and workflows around the models.",
      items: ["React", "Vite", "Bootstrap", "Gradio", "Streamlit", "n8n"],
    },
  ],

  /* ------------------------------------------------------------------------
     EDUCATION
     ------------------------------------------------------------------------ */
  education: [
    {
      school: "Bangladesh University of Professionals",
      degree: "BSc in Information & Communication Engineering",
      period: "2021 — 2026",
      location: "Dhaka, Bangladesh",
      details: "",
    },
  ],

  /* ------------------------------------------------------------------------
     CERTIFICATIONS — the id is the link anchor:  yoursite.com/#internship-certificate
     file = the PDF to open / download, preview = the image shown in the viewer
     ------------------------------------------------------------------------ */
  certifications: [
    {
      id: "internship-certificate",
      name: "Certificate of Internship Completion",
      issuer: "SmartData Technologies Limited",
      year: "2026",
      note: "Artificial Intelligence Engineering · Certificate ID SDT-AI-INT-2026-0623",
      file: "assets/docs/Internship-Certificate-SmartData.pdf",
      preview: "assets/img/internship-certificate.jpg",
    },
  ],

  /* ------------------------------------------------------------------------
     AWARDS & ACHIEVEMENTS — hidden while empty.
     ------------------------------------------------------------------------ */
  awards: [],

  /* ------------------------------------------------------------------------
     CONTACT
     ------------------------------------------------------------------------ */
  contact: {
    title: "Have a project *in mind?*",
    text: "I’m always glad to talk about computer-vision systems, edge-AI deployment and research collaborations. Email is the fastest way to reach me.",
  },
};
