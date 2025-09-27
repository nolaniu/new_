"use client";
import { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export default function SharePopup({ url, title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 触发按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
      >
        分享
      </button>

      {/* 弹窗 */}
      {open && (
        <div className="absolute bottom-full mb-2 right-0 bg-white border border-slate-200 shadow-lg rounded-lg p-3 flex gap-2 z-50">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <EmailShareButton url={url} subject={title}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
}
