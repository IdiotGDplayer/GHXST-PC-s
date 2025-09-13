// Update live summary whenever a checkbox changes
document.querySelectorAll('input[type=checkbox]').forEach(cb => {
  cb.addEventListener('change', () => {
    let selected = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach(c => {
      selected.push(c.dataset.build);
    });
    document.getElementById('summary').innerText = selected.join('\n');
  });
});

// Send selected builds to Discord webhook
function sendToDiscord() {
  const webhookURL = "https://discord.com/api/webhooks/1416511417489555486/VGm6LlCS2EQQYjxZhTz2oARbF_2CVFb8ziWByfAjo-XwcpL084OEZIlfA9ZifEGSfqzC";
  let selected = [];
  document.querySelectorAll('input[type=checkbox]:checked').forEach(cb => {
    selected.push(cb.dataset.build);
  });

  if(selected.length === 0){
    alert("No builds selected!");
    return;
  }

  fetch(webhookURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content: selected.join('\n')})
  }).then(() => alert("Builds sent to Discord!"));
}
