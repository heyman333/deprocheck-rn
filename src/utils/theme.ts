// TODO: 앱에서 사용되는 컬러 정의
export const colors = {
  white: '#ffffff',
  black: '#222222',
};

const theme = {
  member: {
    background: colors.white,
  },
  admin: {
    background: colors.black,
  },
};

export const createTheme = (type: string) => {
  switch (type) {
    case 'MEMBER':
      return theme.member;
    case 'ADMIN':
      return theme.admin;
    default:
      return theme.member;
  }
};
