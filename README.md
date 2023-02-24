### Simple One Time Cron Scheduling

### Why use one time cron

1. Reduce number of io calls to db or webserver compared to a periodic cron
2. Execute when only needed

### When not to use dynamic crons

1. If vms have very very small memory space
2. when one time tasks exceeds more than a threshold of 9000

### To Test

1. Start the App
2. send to POST /crons with a body { "executeAt": DateStringInUTC }
4. Call GET /crons to see number of crons currently
3. Observe log execution
4. Call GET /crons to see number of crons left

### Test Logs

![Screenshot 2023-02-24 at 9 41 12 PM](https://user-images.githubusercontent.com/23375702/221194781-5252e29c-ba00-4135-ab0f-ab70b1745372.png)

### To Enhance
1. Periodic check of current crons and clean up
2. Stresss test up to 9000 cron tasks. Some say it is possible to hit such a number

