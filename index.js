export default app => {
  app.on('pull_request.opened', async context => {
    context.log(context.payload);
  })
}