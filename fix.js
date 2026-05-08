const fs = require('fs');
const content = fs.readFileSync('style.css', 'utf8');
const lines = content.split('\n').slice(0, 676);

const newCss = `
/* Modal Styling */
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px);
    z-index: 1000; display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
}
.modal-overlay.active { opacity: 1; pointer-events: auto; }
.modal-container {
    width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto;
    position: relative; padding: 40px; transform: translateY(20px); transition: transform 0.3s ease;
}
.modal-overlay.active .modal-container { transform: translateY(0); }
.modal-close {
    position: absolute; top: 20px; right: 20px; background: none; border: none;
    color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; transition: color 0.3s;
}
.modal-close:hover { color: var(--text-primary); }
.modal-title { font-size: 1.8rem; margin-bottom: 8px; }
.modal-desc { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px; }
.modal-form .form-group { margin-bottom: 16px; text-align: left; }
.modal-form .form-row { display: flex; gap: 12px; }
.modal-form label { display: block; margin-bottom: 8px; font-size: 0.85rem; color: var(--text-secondary); }
.modal-form input[type="text"], .modal-form input[type="email"], .modal-form input[type="tel"] {
    width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border-light);
    background: rgba(255,255,255,0.05); color: #fff; font-family: inherit;
}
.modal-form input:focus { outline: none; border-color: rgba(255,255,255,0.3); }
.checkbox-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.checkbox-group label { display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 0; font-size: 0.85rem;}
.privacy-group { background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px; margin-top: 24px; }
.privacy-label { display: flex; align-items: flex-start; gap: 8px; color: var(--text-primary); font-weight: 500; cursor: pointer; font-size: 0.9rem;}
.privacy-details { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 8px; padding-left: 24px; }
.submit-btn { width: 100%; margin-top: 24px; }

/* Keycap Themes Layout */
.keycap-themes-wrapper {
    display: flex; gap: 60px; flex-wrap: wrap; justify-content: center; margin-top: 60px;
}
.keycap-theme-group {
    flex: 1; min-width: 300px; display: flex; flex-direction: column; align-items: center;
}
.theme-group-title {
    margin-bottom: 20px; font-family: var(--font-serif); font-size: 1.5rem;
    color: var(--text-primary); text-align: center;
}
.guardian-grid-container {
    margin: 0 auto; max-width: 400px; width: 100%;
    aspect-ratio: 1/1; position: relative;
}
`;

fs.writeFileSync('style.css', lines.join('\n') + '\n' + newCss);
