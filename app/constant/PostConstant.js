import { Icons } from '../common/component/Icons';

export const OPTIONS_KEY = {
  DELETE: 'delete_post',
  HIDDEN_POST: 'hidden_post',
  REPORT: 'report',
  EDIT: 'edit'
};

export const OPTIONS_SHOW = {
  OWNER: 'owner',
  OTHER: 'other',
  ALL: 'all'
};

export const OPTION_POST = [
  {
    key: OPTIONS_KEY.EDIT,
    author: OPTIONS_SHOW.OWNER,
    title: 'Chỉnh sửa bài đăng',
    explain: 'Bao gồm quyền xem bài đăng, nội dung ảnh/ video, ...',
    icon: Icons.AntDesign,
    iconName: 'edit'
  },
  {
    key: OPTIONS_KEY.DELETE,
    author: OPTIONS_SHOW.ALL,
    title: 'Xóa bài đăng',
    explain: 'Bài đăng ẩn khỏi nhật ký',
    icon: Icons.AntDesign,
    iconName: 'delete'
  },
  {
    key: OPTIONS_KEY.HIDDEN_POST,
    author: OPTIONS_SHOW.OTHER,
    title: 'Ẩn nhật ký',
    explain: 'Toàn bộ bài đăng và khoảnh khắc của người này sẽ bị ẩn đi',
    icon: Icons.AntDesign,
    iconName: 'deleteuser'
  },
  {
    key: OPTIONS_KEY.REPORT,
    author: OPTIONS_SHOW.OTHER,
    title: 'Báo xấu',
    explain: null,
    icon: Icons.AntDesign,
    iconName: 'warning'
  }
];

export const OPTION_REPORT_KEY = {
  SENSITIVE_CONTENT: 1, // Nội dung nhạy cảm
  SPAM: 2, // Làm phiền,
  CHEAT: 3, // Lừa đảo,
  OTHER_REASON: 0 // Lý do khác
};

export const OPTION_REPORT = [
  {
    key: OPTION_REPORT_KEY.SENSITIVE_CONTENT,
    title: 'Nội dung nhạy cảm'
  },
  {
    key: OPTION_REPORT_KEY.SPAM,
    title: 'Làm phiền'
  },
  {
    key: OPTION_REPORT_KEY.CHEAT,
    title: 'Lừa đảo'
  },
  {
    key: OPTION_REPORT_KEY.OTHER_REASON,
    title: 'Nhập lý do khác'
  }
];
