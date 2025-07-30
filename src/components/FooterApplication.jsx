import React from "react";

const FooterApplication = () => {
  return (
    <footer className="mt-12 bg-gradient-to-br from-white to-purple-50 p-6 text-sm text-gray-700 border-t border-purple-100">

      <div className="text-center mt-10 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} <span className="text-[#efff14de] font-semibold">SkillBridge</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterApplication;
