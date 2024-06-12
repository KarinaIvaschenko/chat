const commonModalWrapper = {
  backgroundColor: '#313338',
  borderRadius: 4,
  paddingTop: 24,
  paddingBottom: 32,
  paddingLeft: 32,
  paddingRight: 32,
  width: 544,
  position: 'absolute' as 'absolute',
  top: '50%',
  right: '50%',
  left: '50%',
};

export const stylesModals = {
  modalWrapper: {
    ...commonModalWrapper,
    height: 348,
  },
  changeNameModal: {
    ...commonModalWrapper,
    height: 282,
  },
  languageModal: { ...commonModalWrapper, height: 383 },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center' as 'center',
    marginBottom: 32,
  },
  titleModalContainer: { display: 'flex', alignItems: 'end' },
  titleModal: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 26,
    marginRight: 8,
  },
  titleImg: { width: 28, height: 28 },
  closeBtn: { width: 20, height: 20 },
  iconClose: { color: '#b6b6b6', width: 20, height: 20 },
  textModal: {
    color: '#fff',
    marginBottom: 32,
  },
  infoUser: {
    display: 'flex',
    marginBottom: 32,
  },
  infoUserChange: { marginBottom: 32 },
  formUserChange: {
    backgroundColor: '#313338',
    border: '1px solid #fff',
    borderRadius: '4px',
  },
  inputUserChange: {
    width: '100%',
    backgroundColor: '#313338',
    borderRadius: 4,
    borderColor: '#fff',
    height: 40,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#fff',
  },
  infoUserText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '214%',
    marginBottom: 4,
  },
  userImg: { width: 60, height: 60, marginRight: 16 },
  userContainer: { paddingTop: 8, paddingBottom: 8 },
  userName: {
    color: '#fff',
  },
  userEmail: {
    color: '#b6b6b6',
    marginTop: 4,
  },
  buttonsModal: { display: 'flex', gap: 16 },
};
