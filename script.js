// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
      themeIcon.src = 'assets/moon.svg';
    } else {
      themeIcon.src = 'assets/sun.svg';
    }
  });
}

// Load dark theme stylesheet (absolute path)
(function() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/GHXST-PC-s/darktheme.css';
  document.head.appendChild(link);
})();

// --- Card Checkbox + Discord Webhook --- //
const webhookURL = "https://discord.com/api/webhooks/1416511417489555486/VGm6LlCS2EQQYjxZhTz2oARbF_2CVFb8ziWByfAjo-XwcpL084OEZIlfA9ZifEGSfqzC";

// Make entire card clickable for checkbox
document.querySelectorAll('.card').forEach(card => {
  const checkbox = card.querySelector('input[type="checkbox"]');
  if(checkbox){
    card.addEventListener('click', e => {
      // prevent double toggling if clicking directly on the checkbox
      if(e.target !== checkbox){
        checkbox.checked = !checkbox.checked;
      }
    });
  }
});

// Add "Send Selected PCs to Discord" button only if container exists
const container = document.querySelector('.container');
if(container){
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send Selected PCs to Discord";
  sendBtn.style.cssText = "display:block;margin:1rem auto;padding:0.8rem 1.5rem;background:#2563eb;color:white;border-radius:6px;font-weight:bold;cursor:pointer;";
  container.after(sendBtn); // place below cards

  sendBtn.addEventListener("click", () => {
    const selectedPCs = [];

    document.querySelectorAll(".card input[type='checkbox']:checked").forEach(cb => {
      const card = cb.closest(".card");
      const name = cb.value;
      const specs = Array.from(card.querySelectorAll(".specs li")).map(li => li.textContent);
      selectedPCs.push({
        name,
        cpu: specs[0] || "",
        motherboard: specs[1] || "",
        ram: specs[2] || "",
        gpu: specs[3] || "",
        storage: specs[4] || "",
        psu: specs[5] || "",
        cooler: specs[6] || ""
      });
    });

    if(selectedPCs.length === 0) return; // Do nothing if none selected

    // Compute max lengths for padding
    const headers = ["PC Name","CPU","Motherboard","RAM","GPU","Storage","PSU","Cooler"];
    const allRows = selectedPCs.map(p => [p.name,p.cpu,p.motherboard,p.ram,p.gpu,p.storage,p.psu,p.cooler]);
    const colWidths = headers.map((h,i) => Math.max(h.length, ...allRows.map(r => r[i].length)));

    // Build table string
    const pad = (text,width) => text + " ".repeat(width - text.length);
    const headerRow = "| " + headers.map((h,i) => pad(h,colWidths[i])).join(" | ") + " |";
    const separatorRow = "|-" + colWidths.map(w => "-".repeat(w)).join("-|-") + "-|";
    const bodyRows = allRows.map(r => "| " + r.map((c,i) => pad(c,colWidths[i])).join(" | ") + " |");

    const messageContent = "```" + [headerRow,separatorRow,...bodyRows].join("\n") + "```";

    fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: messageContent })
    })
    .then(res => {
      if(res.ok) alert("Sent successfully!");
      else alert("Failed to send.");
    })
    .catch(err => console.error(err));
  });
}
