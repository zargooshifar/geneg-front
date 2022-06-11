export class ServerSourceConf {

  protected static readonly ORDER_KEY = 'order';
  protected static readonly PAGER_PAGE_KEY = 'page';
  protected static readonly PAGER_LIMIT_KEY = 'limit';
  protected static readonly FILTER_FIELD_KEY = '#field#';
  protected static readonly TOTAL_KEY = 'x-total-count';
  protected static readonly DATA_KEY = '';

  endPoint: string;
  getEndPoint: string;

  crateEndPoint: string;
  createAsForm: boolean;
  editEndPoint: string;
  deleteEndPoint: string;

  listExtraFields: any;
  addExtraFields: any;
  addExcludeFileds: any;

  orderDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  totalKey: string;
  dataKey: string;

  constructor(
    { endPoint = '',
      getEndPoint= '',
      crateEndPoint= '',
      createAsForm = false,
      editEndPoint= '',
      deleteEndPoint= '',
      listExtraFields = {},
      addExtraFields = {},
      addExcludeFileds = [],
      orderDirKey = '',
      pagerPageKey = '',
      pagerLimitKey = '',
      filterFieldKey = '',
      totalKey = '',
      dataKey = '' } = {}) {

    this.endPoint = endPoint ? endPoint : '';
    this.getEndPoint = getEndPoint ? getEndPoint : '';
    this.crateEndPoint = crateEndPoint ? crateEndPoint : '';
    this.createAsForm = createAsForm ? createAsForm : false;
    this.editEndPoint = editEndPoint ? editEndPoint : '';
    this.deleteEndPoint = deleteEndPoint ? deleteEndPoint : '';
    this.listExtraFields = listExtraFields ? listExtraFields : {};
    this.addExtraFields = addExtraFields ? addExtraFields : {};
    this.addExcludeFileds = addExcludeFileds ? addExcludeFileds : [],
    this.orderDirKey = orderDirKey ? orderDirKey : ServerSourceConf.ORDER_KEY;
    this.pagerPageKey = pagerPageKey ? pagerPageKey : ServerSourceConf.PAGER_PAGE_KEY;
    this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : ServerSourceConf.PAGER_LIMIT_KEY;
    this.filterFieldKey = filterFieldKey ? filterFieldKey : ServerSourceConf.FILTER_FIELD_KEY;
    this.totalKey = totalKey ? totalKey : ServerSourceConf.TOTAL_KEY;
    this.dataKey = dataKey ? dataKey : ServerSourceConf.DATA_KEY;
  }
}
