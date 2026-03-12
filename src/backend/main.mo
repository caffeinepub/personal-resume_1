actor {
  public query ({ caller }) func hello(name : Text) : async Text {
    "Hello, " # name # "!";
  };
};
