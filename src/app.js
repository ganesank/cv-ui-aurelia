import { PLATFORM } from "aurelia-pal";
import { inject } from "aurelia-dependency-injection";
import { UserService } from "./shared/services/user-service";
import { SharedState } from "./shared/state/shared-state";
import { Redirect } from "aurelia-router";

@inject(UserService)
export class App {
  constructor(userService) {
    this.message = "Hello World!"; // just for unit testing ;)
    this.userService = userService;
  }

  configureRouter(config, router) {
    config.title = "Ganesan Karuppaiya Aurelia  CV";
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {
        route: ["", "home"],
        moduleId: PLATFORM.moduleName("./components/home/home-component"),
        name: "home",
        title: "Home"
      },

      {
        route: ["settings"],
        moduleId: PLATFORM.moduleName(
          "./components/settings/settings-component"
        ),
        name: "settings",
        title: "Settings",
        settings: { auth: true }
      },
      {
        route: [":name"],
        moduleId: PLATFORM.moduleName("./components/profile/profile-component"),
        name: "profile",
        title: "Profile"
      }
    ]);

    this.router = router;
  }

  attached() {
    this.userService.populate();
  }
}

@inject(SharedState)
export class AuthorizeStep {
  constructor(state) {
    this.state = state;
  }

  run(navigationInstruction, next) {
    

    return next();
  }
}
