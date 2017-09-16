export enum WorkerAccessState {
  /**
   * 0邀请中
   */
  inviting=0,
    /**
     * 正常
     * @type {number}
     */
  ok=1,
    /**
     * -1已解除
     * @type {number}
     */
  relieve=-1,
    /**
     * -2已冻结
     * @type {number}
     */
  frozen=-2
}
