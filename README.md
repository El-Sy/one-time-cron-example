### Simple Dynamic One Time Cron Scheduling

### Why use many dynamic one-time cron

1. Reduce number of io calls to db or webserver compared to a periodic cron for small number
2. Execute when only needed

### When not to use dynamic crons

1. If vms have very very small memory space
2. when one time tasks exceeds more than a threshold of 9000 at any given time. Given the business volume one can estimate what is the maximum number of task that can be cancelled

### To Test

1. Start the App
2. send to POST /crons with a body { "executeAt": DateStringInUTC }
4. Call GET /crons to see number of crons currently
3. Observe log execution
4. Call GET /crons to see number of crons left

### Test Logs

![Screenshot 2023-02-24 at 9 41 12 PM](https://user-images.githubusercontent.com/23375702/221194781-5252e29c-ba00-4135-ab0f-ab70b1745372.png)

### To Enhance
1. Each cron to tackle a pool of tasks that is within the time range (e.g. 10 mins *after* current time for a less punitive system)
2. Before cron is created, check if there is any crons that will be executed 5 mins after the current intended execute time. If there is, skip cron creation
3. Periodic check of current crons and clean up any expired crons
4. Stresss test up to 9000 cron tasks. Some say it is possible to hit such a number


### More Research
Check out how others implement many one time cron task. When every second a task is required, a good vm with a single cron and a database that supports high reads and writes probably makes sense.

