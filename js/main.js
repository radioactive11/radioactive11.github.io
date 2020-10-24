class Hardware {
  constructor(light) {
    this.light = light;
    this.state = 'on';
  }

  on() {
    this.state = 'on';
    this.light.removeClass("lightOff");
    this.light.addClass("lightOn");
  }

  off() {
    this.state = 'off';
    this.light.removeClass("lightOn");
    this.light.addClass("lightOff");
  }

  isOn() {
    return this.state == 'on';
  }

  power() {
    if (this.isOn()) {
      this.off();
    } else {
      this.on();
    }
  }}




class Screen extends Hardware {
  constructor(output, light) {
    super(light);
    this.output = output;
    this.output.hide();
    this.output.parent().removeClass("screenEffect");
    this.noSignalMode = true;;
  }

  write(text, leftOffset) {
    if (leftOffset) {
      var $span = $(document.createElement("span"));
      $span.append(text + "<br/>");
      $span.css("padding-left", leftOffset + "px");
      this.output.append($span);
    } else {
      this.output.append(text + "<br/>");
    }
    this.scroll();
  }

  scroll() {
    this.output.animate({
      scrollTop: $(".output").height() },
    0);
  }

  newLine() {
    this.output.append("<br/>");
  }

  clear() {
    this.output.empty();
  }

  input(centralUnit) {
    this.output.append("A> ");
    var $input = $(document.createElement("input"));
    $input.addClass("terminalInput");
    this.output.append($input);
    this.output.append("<br/>");
    $input.focus();
    var screen = this;
    $input.on("keypress", function (event) {
      if (event.which == 13) {
        centralUnit.command(screen, $input.val());
        $input.prop("disabled", true);
        screen.input(centralUnit);
      }
    });
  }

  on(callback) {
    super.on();
    var screen = this;
    this.output.parent().addClass("screenEffect");
    this.output.show();
    this.output.delay(1000).queue(function (next) {
      next();
      screen.write("Checking connections...");
      screen.output.delay(2000).queue(function (next) {
        next();
        callback();
      });
    });
  }

  off() {
    super.off();
    var screen = this;
    if (this.noSignalMode) {
      this.signal();
    }
    this.write("Disconnecting...");
    this.output.delay(2000).queue(function (next) {
      next();
      screen.output.hide();
      screen.output.parent().removeClass("screenEffect");
    });
  }

  signal() {
    this.output.find("#noSignal").remove();
  }

  power(centralUnit, callback) {
    if (this.isOn()) 
    {
      this.off();
      callback(true);
    }
     else 
     {
      var screen = this;
      var connection = false;
      this.on(function () 
      {
        if (!centralUnit.isOn()) 
        {
          screen.noSignal();
          callback(connection);
        } else 
        {
          if (centralUnit.isBoot()) {
            centralUnit.terminal(screen);
          }
          connection = true;
          callback(connection);
        }
      });
    }
  }

  connect(callback) {
    var screen = this;
    this.output.delay(1000).queue(function (next) {
      next();
      if (screen.noSignalMode) {
        screen.noSignalMode = false;
        screen.signal();
      }
      screen.write("EGA connector initialized");
      callback();
    });
  }

  noSignal() {
    this.noSignalMode = true;
    var $popup = $(document.createElement("div"));
    $popup.addClass("popup");
    $popup.addClass("screenEffect");
    $popup.attr("id", "noSignal");
    $popup.text("NO SIGNAL");
    this.output.append($popup);
  }}


class CentralUnit extends Hardware {
  constructor(button, light) {
    super(light);
    this.button = button;
    this.bootStatus = false;
  }

  on(screen, callback) {
    super.on();
    this.button.removeClass("computerButtonOff");
    this.button.addClass("computerButtonOn");
    screen.connect(function () {
      callback();
    });
  }

  off(screen) {
    super.off();
    this.button.removeClass("computerButtonOn");
    this.button.addClass("computerButtonOff");
    this.bootStatus = false;
    screen.clear();
  }

  power(screen) {
    if (this.isOn()) {
      this.off(screen);
      if (screen.isOn()) {
        screen.output.delay(1000).queue(function (next) {
          next();
          screen.noSignal();
        });
      }
    } else {
      var centralUnit = this;
      this.on(screen, function () {
        centralUnit.boot(screen);
      });
    }
  }

  date() {
    var date = new Date();
    var dayNumbers = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    return dayNumbers[date.getDay()] + " " + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
  }

  terminal(screen) {
    screen.newLine();
    screen.input(this);
    screen.scroll();
  }

  command(screen, command) {
    if (command != "") {
      screen.write("Is this some High Level command that I am too Low Level to understand?");
    }
  }

  isBoot() {
    return this.bootStatus;
  }

  boot(screen) {
    var centralUnit = this;
    screen.output.delay(1000).queue(function (next) {
      next();
      screen.write("POST succesfull...");
      screen.output.delay(200).queue(function (next) {
        next();
        screen.newLine();
        screen.write("Arijit Roy");
        screen.output.delay(200).queue(function (next) {
          next();
          screen.newLine();
          screen.write("19 y/o ML Engineer", 20);
          screen.output.delay(200).queue(function (next) {
            next();
             screen.write("Competitive Coder", 20);
              screen.output.delay(200).queue(function (next) {
                next();
            screen.write("Mother Tongue: C++", 20);
            screen.output.delay(200).queue(function (next) {
              next();
              screen.write("Address: 127.0.0.1", 20);
              screen.output.delay(200).queue(function (next) {
                next();
                 screen.write("Python, TensorFlow, Flask", 20);
              screen.output.delay(200).queue(function (next) {
              	 next();
                 screen.write("Pseudonym: radioactive11", 20);
              screen.output.delay(200).queue(function (next) {
                next();
                screen.newLine();
                screen.write("Current date is " + centralUnit.date());
                screen.output.delay(200).queue(function (next) {
                  next();
                  screen.newLine();
                  screen.write("IBM Personnal Computer");
                  screen.output.delay(200).queue(function (next) {
                    next();
                    screen.write("Helpling computers take over humanity, epoch by epoch");
                    screen.output.delay(200).queue(function (next) {
                      next();
                      screen.write("Version 1.23 Copyright IBM Corp 1984");
                    screen.output.delay(200).queue(function (next) {
                      next();

                      centralUnit.terminal(screen);
                      centralUnit.bootStatus = true;
                    });
                  });
                });
              });
            });
          });
          });
        });
      });
    });
      });
    });
    });
  }}


class Computer {
  constructor(centralUnit, screen) {
    this.centralUnit = centralUnit;
    this.screen = screen;
    this.connection = false;
  }

  startScreen() {
    var computer = this;
    this.screen.power(this.centralUnit, function (connection) {
      computer.connection = connection;
    });
  }

  startCentralUnit() {
    this.centralUnit.power(this.screen);
  }}


var screen = new Screen($(".output"), $(".screenBox").find(".powerLight"));
var centralUnit = new CentralUnit($(".computerButton"), $(".computer").find(".powerLight"));
var computer = new Computer(centralUnit, screen);

$(".screenBox").find(".powerButton").on("click", function () {
  computer.startScreen();
});

$(".computerButton").on("click", function () {
  computer.startCentralUnit();
});

computer.startScreen();
computer.centralUnit.button.delay(2000).queue(function (next) {
  computer.startCentralUnit();
});