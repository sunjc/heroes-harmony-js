const DELETE_DIALOG_ID = 'deletedialog';
const DELETE_EVENT_NAME = 'delete';

export default {
    props: {
        confirm: true,
        entityid: 0,
        keyword: ''
    },
    data: {
        dialogInfo: '',
    },
    onInit() {
        this.dialogInfo = this.$t('strings.deleteConfirm', {
            name: this.keyword
        });
    },
    deleteObject() {
        if (this.confirm) {
            this.showDialog();
        } else {
            this.deleteEntity();
        }
    },
    showDialog() {
        this.$element(DELETE_DIALOG_ID).show();
    },
    closeDialog() {
        this.$element(DELETE_DIALOG_ID).close();
    },
    exeDelete() {
        this.deleteEntity();
        this.closeDialog();
    },
    deleteEntity() {
        this.$emit(DELETE_EVENT_NAME, {
            id: this.entityid
        });
    }
}