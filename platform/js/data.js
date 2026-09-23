// 志愿调研数据支撑平台 - 数据管理模块
const DataStore = {
  KEYS: {
    SURVEYS: 'vrp_surveys',
    PROJECTS: 'vrp_projects'
  },

  // 获取问卷数据
  getSurveys() {
    return JSON.parse(localStorage.getItem(this.KEYS.SURVEYS) || '[]');
  },

  // 保存问卷
  addSurvey(data) {
    const surveys = this.getSurveys();
    surveys.push({ ...data, id: Date.now(), time: new Date().toLocaleString('zh-CN') });
    localStorage.setItem(this.KEYS.SURVEYS, JSON.stringify(surveys));
    return surveys.length;
  },

  // 获取项目数据
  getProjects() {
    const stored = localStorage.getItem(this.KEYS.PROJECTS);
    if (stored) return JSON.parse(stored);
    // 默认示例项目
    return [
      { id: 1, name: '社区敬老陪伴', type: '助老', volunteers: 24, hours: 120, satisfaction: 4.6, status: '进行中', effectiveness: 88 },
      { id: 2, name: '山区支教行动', type: '教育', volunteers: 18, hours: 360, satisfaction: 4.8, status: '已完成', effectiveness: 92 },
      { id: 3, name: '环保净滩活动', type: '环保', volunteers: 35, hours: 70, satisfaction: 4.3, status: '进行中', effectiveness: 76 },
      { id: 4, name: '图书馆志愿服务', type: '文化', volunteers: 15, hours: 90, satisfaction: 4.5, status: '进行中', effectiveness: 81 },
      { id: 5, name: '阳光义卖公益', type: '公益', volunteers: 20, hours: 16, satisfaction: 4.7, status: '已完成', effectiveness: 90 },
      { id: 6, name: '医院导诊服务', type: '医疗', volunteers: 12, hours: 48, satisfaction: 4.4, status: '进行中', effectiveness: 79 }
    ];
  },

  saveProjects(projects) {
    localStorage.setItem(this.KEYS.PROJECTS, JSON.stringify(projects));
  },

  // 计算统计
  getStats() {
    const surveys = this.getSurveys();
    const projects = this.getProjects();
    const totalVolunteers = projects.reduce((s, p) => s + p.volunteers, 0);
    const totalHours = projects.reduce((s, p) => s + p.hours, 0);
    const avgSatisfaction = surveys.length
      ? (surveys.reduce((s, r) => s + parseInt(r.satisfaction), 0) / surveys.length).toFixed(1)
      : '4.5';
    const avgEffectiveness = (projects.reduce((s, p) => s + p.effectiveness, 0) / projects.length).toFixed(0);
    return {
      surveyCount: surveys.length,
      projectCount: projects.length,
      totalVolunteers,
      totalHours,
      avgSatisfaction,
      avgEffectiveness
    };
  }
};

// Toast 提示
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.background = type === 'success' ? 'var(--accent3)' : 'var(--danger)';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// 导航高亮
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topbar nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}
