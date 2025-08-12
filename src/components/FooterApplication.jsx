// FooterApplication.jsx - minimal footer

import React from "react";

const FooterApplication = () => {
  return (
    <footer className="footer">
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">SkillBridge</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterApplication;
