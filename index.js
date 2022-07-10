
class Employee {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    } 

    describe() {
        return `${this.name} goes to ${this.position}.`;
    }
}


class Job {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    addEmployee (employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error('you can only add an instance of a Employee. Argument is not a employee: ${employee}');
        }
    }

    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}

class Menu {
    constructor() {
        this.jobs = [];
        this.selectedJobs = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createJob();
                    break;
                case '2':
                    this.viewJob();
                    break;
                case '3':
                    this.deleteJob();
                    break;
                case '4':
                    this.displayJob();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
      return prompt(`
        0) exit
        1) create new job
        2) view job
        3) delete job
        4) display all jobs
        `);
    }

    showJobMenuOptions(jobInfo) {
        return prompt(`
        0) back
        1) add employee
        2) delete employee
        --------------------
        ${jobInfo}
        `);
    }

    
    displayJobs() {
        let jobString = '';
        for (let i = 0; i < this.jobs.length; i++) {
            jobString += i + ') ' + this.jobs[i].name + '\n';
        }
        alert(jobString); 
    }

    createJob() {
        let name = prompt('Enter name for new Job');
        this.jobs.push(new Job(name));
    }

    viewJob() {
        let index = prompt('Enter the index of the job you wish to view:');
        if(index > -1 && index < this.jobs.length) {
            this.selectedJob = this.jobs[index];
            let description = 'Job Name: ' + this.selectedJob.name + '\n';
            
            for (let i = 0; i < this.selectedJob.employees.length; i++) {
                description += i + ') ' + this.selectedJob.employees[i].name + ' - ' + this.selectedJob.employees[i].position + '\n';
            }

            let selection = this.showJobMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        }
    }

    deleteJob() {
        let index = prompt('Enter the index of the job you wish to delete:');
        if (index > -1 && index < this.jobs.length) {
            this.jobs.splice(index, 1);
        }
    }

    createEmployee() {
        let name = prompt('Enter name for new employee:');
        let position = prompt('Enter position for new employee:')
        this.selectedJob.employees.push(new Employee(name, position));
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.selectedJob.players.length) {
            this.selectedJob.employees.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();