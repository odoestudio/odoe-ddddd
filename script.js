// Cybersecurity Dashboard - Real-time Simulation

document.addEventListener('DOMContentLoaded', () => {
  // Stats
  const threatsDetected = document.getElementById('threatsDetected');
  const threatsBlocked = document.getElementById('threatsBlocked');
  const activeIncidents = document.getElementById('activeIncidents');
  const systemsMonitored = document.getElementById('systemsMonitored');
  const threatLevel = document.getElementById('threatLevel');
  const threatLevelBar = document.getElementById('threatLevelBar');
  const threatFeed = document.getElementById('threatFeed');
  const alertsTable = document.getElementById('alertsTable');

  // Simulated data
  let stats = {
    threatsDetected: 1243,
    threatsBlocked: 1201,
    activeIncidents: 3,
    systemsMonitored: 42
  };

  let threatLevels = [
    { level: 'Low', color: 'text-green-400', bar: 'bg-green-400', width: '30%' },
    { level: 'Elevated', color: 'text-yellow-400', bar: 'bg-yellow-400', width: '60%' },
    { level: 'Critical', color: 'text-red-400', bar: 'bg-red-400', width: '90%' }
  ];

  let currentThreatLevel = 1; // Start at 'Elevated'

  const threatTypes = [
    { icon: 'fa-bug', color: 'text-red-400', label: 'Malware' },
    { icon: 'fa-user-secret', color: 'text-yellow-400', label: 'Intrusion' },
    { icon: 'fa-shield-virus', color: 'text-green-400', label: 'Phishing' },
    { icon: 'fa-network-wired', color: 'text-blue-400', label: 'DDoS' },
    { icon: 'fa-lock', color: 'text-purple-400', label: 'Ransomware' }
  ];

  const sources = ['Firewall', 'Endpoint', 'SIEM', 'Cloud', 'VPN', 'Email Gateway'];
  const statuses = [
    { label: 'Blocked', color: 'bg-green-600' },
    { label: 'Investigating', color: 'bg-yellow-500' },
    { label: 'Active', color: 'bg-red-600' },
    { label: 'Resolved', color: 'bg-blue-600' }
  ];

  // Utility: Format time
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  // Update stats
  function updateStats() {
    threatsDetected.textContent = stats.threatsDetected;
    threatsBlocked.textContent = stats.threatsBlocked;
    activeIncidents.textContent = stats.activeIncidents;
    systemsMonitored.textContent = stats.systemsMonitored;
  }

  // Update threat level
  function updateThreatLevel() {
    const t = threatLevels[currentThreatLevel];
    threatLevel.textContent = t.level;
    threatLevel.className = `text-3xl font-bold ${t.color}`;
    threatLevelBar.className = `h-3 transition-all duration-500 ${t.bar}`;
    threatLevelBar.style.width = t.width;
  }

  // Simulate threat feed
  function addThreatFeedItem() {
    const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const time = formatTime(new Date());
    const msg = `New <span class="font-semibold">${type.label}</span> detected from <span class="font-semibold">${source}</span> at <span class="font-mono">${time}</span>`;
    const li = document.createElement('li');
    li.className = `flex items-center gap-3 bg-gray-700/60 rounded-lg px-4 py-2 shadow`;
    li.innerHTML = `<i class="fa-solid ${type.icon} ${type.color} text-lg"></i> <span>${msg}</span>`;
    threatFeed.prepend(li);
    // Limit feed to 10 items
    while (threatFeed.children.length > 10) {
      threatFeed.removeChild(threatFeed.lastChild);
    }
  }

  // Simulate alerts table
  function addAlertRow() {
    const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const severity = ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)];
    const severityColor = {
      'Low': 'text-green-400',
      'Medium': 'text-yellow-400',
      'High': 'text-orange-400',
      'Critical': 'text-red-500'
    }[severity];
    const time = formatTime(new Date());
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-4 font-mono text-xs">${time}</td>
      <td class="py-2 px-4 flex items-center gap-2"><i class="fa-solid ${type.icon} ${type.color}"></i> ${type.label}</td>
      <td class="py-2 px-4 font-bold ${severityColor}">${severity}</td>
      <td class="py-2 px-4">${source}</td>
      <td class="py-2 px-4"><span class="${status.color} text-white px-2 py-1 rounded text-xs">${status.label}</span></td>
    `;
    alertsTable.prepend(tr);
    // Limit table to 8 rows
    while (alertsTable.children.length > 8) {
      alertsTable.removeChild(alertsTable.lastChild);
    }
  }

  // Simulate real-time updates
  setInterval(() => {
    // Randomly increment stats
    stats.threatsDetected += Math.floor(Math.random() * 3);
    stats.threatsBlocked += Math.floor(Math.random() * 2);
    if (Math.random() < 0.2) stats.activeIncidents += 1;
    if (Math.random() < 0.1 && stats.activeIncidents > 0) stats.activeIncidents -= 1;
    updateStats();
    addThreatFeedItem();
    addAlertRow();
    // Randomly change threat level
    if (Math.random() < 0.15) {
      currentThreatLevel = Math.floor(Math.random() * threatLevels.length);
      updateThreatLevel();
    }
  }, 2500);

  // Initial render
  updateStats();
  updateThreatLevel();
  for (let i = 0; i < 6; i++) addThreatFeedItem();
  for (let i = 0; i < 5; i++) addAlertRow();
});
