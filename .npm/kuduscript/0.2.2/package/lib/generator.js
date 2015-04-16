/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var package = require("../package.json");
















var fs = require("fs");
var path = require("path");

var isWindows = (process.platform === "win32");


fs.existsSync = (fs.existsSync || path.existsSync);
path.sep = (path.sep || ((isWindows ? "\\" : "/")));

var templatesDir = path.join(__dirname, "templates");
var log = { info: function() {  }};
var confirm = function() { return false;};

var ScriptType = {
  batch: "BATCH",
  bash: "BASH"};


var ProjectType = {
  wap: "WAP",
  website: "WEBSITE",
  node: "NODE",
  python: "PYTHON",
  basic: "BASIC",
  dotNetConsole: "DOT_NET_CONSOLE",
  aspNet5: "ASP_NET5"};


exports.ScriptType = ScriptType;
exports.ProjectType = ProjectType;

function ScriptGenerator(repositoryRoot, projectType, projectPath, solutionPath, sitePath, scriptType, scriptOutputPath, noDotDeployment, noSolution, logger, confirmFunc) {
  argNotNull(repositoryRoot, "repositoryRoot");
  argNotNull(scriptOutputPath, "scriptOutputPath");
  argNotNull(projectType, "projectType");
  argNotNull(sitePath, "sitePath");

  projectType = projectType.toUpperCase();

  if (!scriptType) {

    if (((((projectType === ProjectType.wap) || (projectType === ProjectType.website)) || (projectType === ProjectType.aspNet5)) || (projectType === ProjectType.python))) {

      scriptType = ScriptType.batch; }
     else {

      scriptType = (isWindows ? ScriptType.batch : ScriptType.bash); } ; }

   else {
    scriptType = scriptType.toUpperCase();
    if (((scriptType !== ScriptType.batch) && (scriptType !== ScriptType.bash))) {
      throw new Error("Script type should be either batch or bash"); } ; } ;


  this.scriptType = scriptType;

  log = (logger || log);
  confirm = (confirmFunc || confirm);

  if (projectPath) {
    if (!isPathSubDir(repositoryRoot, projectPath)) {
      throw new Error("The project file path should be a sub-directory of the repository root"); } ;


    var relativeProjectPath = path.relative(repositoryRoot, projectPath);
    log.info((("Project file path: ." + path.sep) + relativeProjectPath));
    this.projectPath = relativeProjectPath;
    this.absoluteProjectPath = projectPath; } ;


  if (solutionPath) {
    if (!isPathSubDir(repositoryRoot, solutionPath)) {
      throw new Error("The solution file path should be the same as repository root or a sub-directory of it."); } ;


    var relativeSolutionPath = path.relative(repositoryRoot, solutionPath);
    log.info((("Solution file path: ." + path.sep) + relativeSolutionPath));
    this.solutionPath = relativeSolutionPath; } ;


  if (!isPathSubDir(repositoryRoot, sitePath)) {
    throw new Error("The site directory path should be the same as repository root or a sub-directory of it."); } ;


  var relativeSitePath = path.relative(repositoryRoot, sitePath);
  if (relativeSitePath) {
    relativeSitePath = (path.sep + relativeSitePath);
    log.info(("The site directory path: ." + relativeSitePath)); } ;

  this.sitePath = (relativeSitePath || "");

  this.repositoryRoot = repositoryRoot;
  this.scriptOutputPath = scriptOutputPath;
  this.projectType = projectType;
  this.noDotDeployment = noDotDeployment;
  this.noSolution = noSolution;
  this.absoluteSitePath = path.join(this.repositoryRoot, this.sitePath);

  this.generators = [];
  this.generators[ProjectType.wap] = generateWapDeploymentScript;
  this.generators[ProjectType.website] = generateWebSiteDeploymentScript;
  this.generators[ProjectType.node] = generateNodeDeploymentScript;
  this.generators[ProjectType.python] = generatePythonDeploymentScript;
  this.generators[ProjectType.basic] = generateBasicWebSiteDeploymentScript;
  this.generators[ProjectType.dotNetConsole] = generateDotNetConsoleDeploymentScript;
  this.generators[ProjectType.aspNet5] = generateAspNet5DeploymentScript;};


function generateAspNet5DeploymentScript(scriptGenerator, _) { var __frame = { name: "generateAspNet5DeploymentScript", line: 126 }; return __func(_, this, arguments, generateAspNet5DeploymentScript, 1, __frame, function __$generateAspNet5DeploymentScript() {
    return scriptGenerator.generateAspNet5DeploymentScript(__cb(_, __frame, 1, 18, function __$generateAspNet5DeploymentScript() { _(); }, true)); });};


function generateDotNetConsoleDeploymentScript(scriptGenerator, _) { var __frame = { name: "generateDotNetConsoleDeploymentScript", line: 130 }; return __func(_, this, arguments, generateDotNetConsoleDeploymentScript, 1, __frame, function __$generateDotNetConsoleDeploymentScript() {
    return scriptGenerator.generateDotNetConsoleDeploymentScript(__cb(_, __frame, 1, 18, function __$generateDotNetConsoleDeploymentScript() { _(); }, true)); });};


function generateWapDeploymentScript(scriptGenerator, _) { var __frame = { name: "generateWapDeploymentScript", line: 134 }; return __func(_, this, arguments, generateWapDeploymentScript, 1, __frame, function __$generateWapDeploymentScript() {
    return scriptGenerator.generateWapDeploymentScript(__cb(_, __frame, 1, 18, function __$generateWapDeploymentScript() { _(); }, true)); });};


function generateWebSiteDeploymentScript(scriptGenerator, _) { var __frame = { name: "generateWebSiteDeploymentScript", line: 138 }; return __func(_, this, arguments, generateWebSiteDeploymentScript, 1, __frame, function __$generateWebSiteDeploymentScript() {
    return scriptGenerator.generateWebSiteDeploymentScript(__cb(_, __frame, 1, 18, function __$generateWebSiteDeploymentScript() { _(); }, true)); });};


function generateNodeDeploymentScript(scriptGenerator, _) { var __frame = { name: "generateNodeDeploymentScript", line: 142 }; return __func(_, this, arguments, generateNodeDeploymentScript, 1, __frame, function __$generateNodeDeploymentScript() {
    return scriptGenerator.generateNodeDeploymentScript(__cb(_, __frame, 1, 18, function __$generateNodeDeploymentScript() { _(); }, true)); });};


function generatePythonDeploymentScript(scriptGenerator, _) { var __frame = { name: "generatePythonDeploymentScript", line: 146 }; return __func(_, this, arguments, generatePythonDeploymentScript, 1, __frame, function __$generatePythonDeploymentScript() {
    return scriptGenerator.generatePythonDeploymentScript(__cb(_, __frame, 1, 18, function __$generatePythonDeploymentScript() { _(); }, true)); });};


function generateBasicWebSiteDeploymentScript(scriptGenerator, _) { var __frame = { name: "generateBasicWebSiteDeploymentScript", line: 150 }; return __func(_, this, arguments, generateBasicWebSiteDeploymentScript, 1, __frame, function __$generateBasicWebSiteDeploymentScript() {
    if (scriptGenerator.solutionPath) {
      return _(new Error("Solution path is not supported with this website type")); } ;

    return scriptGenerator.generateWebSiteDeploymentScript(__cb(_, __frame, 4, 18, function __$generateBasicWebSiteDeploymentScript() { _(); }, true)); });};


ScriptGenerator.prototype.generateDeploymentScript = function ScriptGenerator_prototype_generateDeploymentScript__1(_) { var generator, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateDeploymentScript__1", line: 157 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateDeploymentScript__1, 0, __frame, function __$ScriptGenerator_prototype_generateDeploymentScript__1() {
    generator = __this.generators[__this.projectType];
    if (!generator) {
      return _(new Error(("Invalid project type received: " + __this.projectType))); } ;


    return generator(__this, __cb(_, __frame, 6, 2, function __$ScriptGenerator_prototype_generateDeploymentScript__1() { _(); }, true)); });};


function isPathSubDir(parentPath, childPath) {
  var relativePath = path.relative(parentPath, childPath);




  return ((relativePath.indexOf("..") !== 0) && (relativePath !== path.resolve(childPath)));};



ScriptGenerator.prototype.generateNodeDeploymentScript = function ScriptGenerator_prototype_generateNodeDeploymentScript__2(_) { var __this = this; var __frame = { name: "ScriptGenerator_prototype_generateNodeDeploymentScript__2", line: 176 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateNodeDeploymentScript__2, 0, __frame, function __$ScriptGenerator_prototype_generateNodeDeploymentScript__2() {
    log.info("Generating deployment script for node.js Web Site");

    return __this.generateBasicDeploymentScript("node.template", __cb(_, __frame, 3, 7, function __$ScriptGenerator_prototype_generateNodeDeploymentScript__2() { _(); }, true)); });};


ScriptGenerator.prototype.generatePythonDeploymentScript = function ScriptGenerator_prototype_generatePythonDeploymentScript__3(_) { var __this = this; var __frame = { name: "ScriptGenerator_prototype_generatePythonDeploymentScript__3", line: 182 }; return __func(_, this, arguments, ScriptGenerator_prototype_generatePythonDeploymentScript__3, 0, __frame, function __$ScriptGenerator_prototype_generatePythonDeploymentScript__3() {
    log.info("Generating deployment script for python Web Site");

    if ((__this.scriptType != ScriptType.batch)) {
      return _(new Error("Only batch script files are supported for python Web Site")); } ;


    return __this.generateBasicDeploymentScript("python.template", __cb(_, __frame, 7, 7, function __$ScriptGenerator_prototype_generatePythonDeploymentScript__3() { _(); }, true)); });};


ScriptGenerator.prototype.generateWapDeploymentScript = function ScriptGenerator_prototype_generateWapDeploymentScript__4(_) { var msbuildArguments, msbuildArgumentsForInPlace, solutionDir, solutionArgs, options, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateWapDeploymentScript__4", line: 192 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateWapDeploymentScript__4, 0, __frame, function __$ScriptGenerator_prototype_generateWapDeploymentScript__4() {
    argNotNull(__this.projectPath, "projectPath");

    if ((__this.scriptType != ScriptType.batch)) {
      return _(new Error("Only batch script files are supported for .NET Web Application")); } ;


    if ((!__this.solutionPath && !__this.noSolution)) {
      return _(new Error("Missing solution file path (--solutionFile), to explicitly not require a solution use the flag --no-solution")); } ;


    log.info("Generating deployment script for .NET Web Application");

    msbuildArguments = (("\"%DEPLOYMENT_SOURCE%\\" + __this.projectPath) + "\" /nologo /verbosity:m /t:Build /t:pipelinePreDeployCopyAllFilesToOneFolder /p:_PackageTempDir=\"%DEPLOYMENT_TEMP%\";AutoParameterizationWebConfigConnectionStrings=false;Configuration=Release");
    msbuildArgumentsForInPlace = (("\"%DEPLOYMENT_SOURCE%\\" + __this.projectPath) + "\" /nologo /verbosity:m /t:Build /p:AutoParameterizationWebConfigConnectionStrings=false;Configuration=Release");

    if (__this.solutionPath) {
      solutionDir = path.dirname(__this.solutionPath);
      solutionArgs = ((" /p:SolutionDir=\"%DEPLOYMENT_SOURCE%\\" + solutionDir) + "\\\\\"");
      msbuildArguments += solutionArgs;
      msbuildArgumentsForInPlace += solutionArgs; } ;


    msbuildArguments += " %SCM_BUILD_ARGS%";
    msbuildArgumentsForInPlace += " %SCM_BUILD_ARGS%";

    options = {
      msbuildArguments: msbuildArguments,
      msbuildArgumentsForInPlace: msbuildArgumentsForInPlace };


    return __this.generateDotNetDeploymentScript("deploy.batch.aspnet.wap.template", options, __cb(_, __frame, 31, 7, function __$ScriptGenerator_prototype_generateWapDeploymentScript__4() { _(); }, true)); });};


ScriptGenerator.prototype.generateAspNet5DeploymentScript = function ScriptGenerator_prototype_generateAspNet5DeploymentScript__5(_) { var options, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateAspNet5DeploymentScript__5", line: 226 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateAspNet5DeploymentScript__5, 0, __frame, function __$ScriptGenerator_prototype_generateAspNet5DeploymentScript__5() {
    argNotNull(__this.absoluteProjectPath, "absoluteProjectPath");

    if ((__this.scriptType != ScriptType.batch)) {
      return _(new Error("Only batch script files are supported for ASP.NET 5 Application")); } ;


    log.info("Generating deployment script for ASP.NET 5 Application");

    options = {
      kreProject: __this.absoluteProjectPath };


    return __this.generateKDeploymentScript("deploy.batch.aspnet.5.template", options, __cb(_, __frame, 13, 7, function __$ScriptGenerator_prototype_generateAspNet5DeploymentScript__5() { _(); }, true)); });};


ScriptGenerator.prototype.generateDotNetConsoleDeploymentScript = function ScriptGenerator_prototype_generateDotNetConsoleDeploymentScript__6(_) { var msbuildArguments, solutionDir, solutionArgs, options, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateDotNetConsoleDeploymentScript__6", line: 242 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateDotNetConsoleDeploymentScript__6, 0, __frame, function __$ScriptGenerator_prototype_generateDotNetConsoleDeploymentScript__6() {
    argNotNull(__this.projectPath, "projectPath");

    if ((__this.scriptType != ScriptType.batch)) {
      return _(new Error("Only batch script files are supported for .NET Web Application")); } ;


    if ((!__this.solutionPath && !__this.noSolution)) {
      return _(new Error("Missing solution file path (--solutionFile), to explicitly not require a solution use the flag --no-solution")); } ;


    log.info("Generating deployment script for .NET console application");

    msbuildArguments = (("\"%DEPLOYMENT_SOURCE%\\" + __this.projectPath) + "\" /nologo /verbosity:m /t:Build /p:Configuration=Release;OutputPath=\"%DEPLOYMENT_TEMP%\\app_data\\jobs\\continuous\\deployedJob\"");

    if (__this.solutionPath) {
      solutionDir = path.dirname(__this.solutionPath);
      solutionArgs = ((" /p:SolutionDir=\"%DEPLOYMENT_SOURCE%\\" + solutionDir) + "\\\\\"");
      msbuildArguments += solutionArgs; } ;


    msbuildArguments += " %SCM_BUILD_ARGS%";

    options = {
      msbuildArguments: msbuildArguments,
      msbuildArgumentsForInPlace: msbuildArguments };


    return __this.generateDotNetDeploymentScript("deploy.batch.dotnetconsole.template", options, __cb(_, __frame, 28, 7, function __$ScriptGenerator_prototype_generateDotNetConsoleDeploymentScript__6() { _(); }, true)); });};


ScriptGenerator.prototype.generateWebSiteDeploymentScript = function ScriptGenerator_prototype_generateWebSiteDeploymentScript__7(_) { var msbuildArguments, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateWebSiteDeploymentScript__7", line: 273 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateWebSiteDeploymentScript__7, 0, __frame, function __$ScriptGenerator_prototype_generateWebSiteDeploymentScript__7() { return (function __$ScriptGenerator_prototype_generateWebSiteDeploymentScript__7(__then) {
      if (__this.solutionPath) {

        log.info("Generating deployment script for .NET Web Site");

        if ((__this.scriptType != ScriptType.batch)) {
          return _(new Error("Only batch script files are supported for .NET Web Site")); } ;


        msbuildArguments = (("\"%DEPLOYMENT_SOURCE%\\" + fixPathSeperatorToWindows(__this.solutionPath)) + "\" /verbosity:m /nologo %SCM_BUILD_ARGS%");
        return __this.generateDotNetDeploymentScript("deploy.batch.aspnet.website.template", { msbuildArguments: msbuildArguments }, __cb(_, __frame, 10, 9, __then, true)); } else {


        log.info("Generating deployment script for Web Site");
        return __this.generateBasicDeploymentScript("basic.template", __cb(_, __frame, 14, 9, __then, true)); } ; })(_); });};



ScriptGenerator.prototype.generateBasicDeploymentScript = function ScriptGenerator_prototype_generateBasicDeploymentScript__8(templateFileName, _) { var lowerCaseScriptType, fixedSitePath, templateContent, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateBasicDeploymentScript__8", line: 291 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateBasicDeploymentScript__8, 1, __frame, function __$ScriptGenerator_prototype_generateBasicDeploymentScript__8() {
    argNotNull(templateFileName, "templateFileName");

    lowerCaseScriptType = __this.scriptType.toLowerCase();
    fixedSitePath = ((__this.scriptType === ScriptType.batch) ? fixPathSeperatorToWindows(__this.sitePath) : fixPathSeperatorToUnix(__this.sitePath));




    templateContent = getTemplatesContent([(("deploy." + lowerCaseScriptType) + ".prefix.template"),((("deploy." + lowerCaseScriptType) + ".") + templateFileName),(("deploy." + lowerCaseScriptType) + ".postfix.template"),]).replace(/{SitePath}/g, fixedSitePath);

    return __this.writeDeploymentFiles(templateContent, __cb(_, __frame, 11, 7, function __$ScriptGenerator_prototype_generateBasicDeploymentScript__8() { _(); }, true)); });};


ScriptGenerator.prototype.generateDotNetDeploymentScript = function ScriptGenerator_prototype_generateDotNetDeploymentScript__9(templateFileName, options, _) { var solutionDir, templateContent, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateDotNetDeploymentScript__9", line: 305 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateDotNetDeploymentScript__9, 2, __frame, function __$ScriptGenerator_prototype_generateDotNetDeploymentScript__9() {
    argNotNull(templateFileName, "templateFileName");


    solutionDir = (__this.solutionPath ? path.dirname(__this.solutionPath) : "");









    templateContent = getTemplatesContent(["deploy.batch.prefix.template","deploy.batch.aspnet.template",templateFileName,"deploy.batch.postfix.template",]).replace(/{MSBuildArguments}/g, (options.msbuildArguments || "")).replace(/{MSBuildArgumentsForInPlace}/g, (options.msbuildArgumentsForInPlace || "")).replace(/{SolutionPath}/g, (__this.solutionPath || "")).replace(/{SolutionDir}/g, solutionDir).replace(/{SitePath}/g, fixPathSeperatorToWindows(__this.sitePath));

    return __this.writeDeploymentFiles(templateContent, __cb(_, __frame, 16, 7, function __$ScriptGenerator_prototype_generateDotNetDeploymentScript__9() { _(); }, true)); });};


ScriptGenerator.prototype.generateKDeploymentScript = function ScriptGenerator_prototype_generateKDeploymentScript__10(templateFileName, options, _) { var templateContent, __this = this; var __frame = { name: "ScriptGenerator_prototype_generateKDeploymentScript__10", line: 324 }; return __func(_, this, arguments, ScriptGenerator_prototype_generateKDeploymentScript__10, 2, __frame, function __$ScriptGenerator_prototype_generateKDeploymentScript__10() {
    argNotNull(templateFileName, "templateFileName");






    templateContent = getTemplatesContent(["deploy.batch.prefix.template","deploy.batch.aspnet.template",templateFileName,"deploy.batch.postfix.template",]).replace(/{PROJECT_JSON}/g, fixPathSeperatorToWindows(options.kreProject));

    return __this.writeDeploymentFiles(templateContent, __cb(_, __frame, 10, 7, function __$ScriptGenerator_prototype_generateKDeploymentScript__10() { _(); }, true)); });};


function getTemplatesContent(fileNames) {
  var content = "";

  for (var i in fileNames) {
    content += getTemplateContent(fileNames[i]); };


  content = content.replace(/{Version}/g, package.version);

  return content;};


function fixPathSeperatorToWindows(pathStr) {
  return pathStr.replace(/\//g, "\\");};


function fixPathSeperatorToUnix(pathStr) {
  return pathStr.replace(/\\/g, "/");};


function fixLineEndingsToUnix(contentStr) {
  return contentStr.replace(/\r\n/g, "\n");};


function fixLineEndingsToWindows(contentStr) {
  return contentStr.replace(/(?:\r\n|\n)/g, "\r\n");};


ScriptGenerator.prototype.writeDeploymentFiles = function ScriptGenerator_prototype_writeDeploymentFiles__11(templateContent, _) { var deployScriptFileName, deploymentCommand, deployScriptPath, deploymentFilePath, __this = this; var __frame = { name: "ScriptGenerator_prototype_writeDeploymentFiles__11", line: 365 }; return __func(_, this, arguments, ScriptGenerator_prototype_writeDeploymentFiles__11, 1, __frame, function __$ScriptGenerator_prototype_writeDeploymentFiles__11() {
    argNotNull(templateContent, "templateContent");



    if ((__this.scriptType == ScriptType.batch)) {
      deployScriptFileName = "deploy.cmd";
      deploymentCommand = deployScriptFileName;
      templateContent = fixLineEndingsToWindows(templateContent); }
     else {
      deployScriptFileName = "deploy.sh";
      deploymentCommand = ("bash " + deployScriptFileName);
      templateContent = fixLineEndingsToUnix(templateContent); } ;


    deployScriptPath = path.join(__this.scriptOutputPath, deployScriptFileName);
    deploymentFilePath = path.join(__this.repositoryRoot, ".deployment");


    return writeContentToFile(deployScriptPath, templateContent, __cb(_, __frame, 19, 2, function __$ScriptGenerator_prototype_writeDeploymentFiles__11() { return (function __$ScriptGenerator_prototype_writeDeploymentFiles__11(__then) {

        if (!__this.noDotDeployment) {

          return writeContentToFile(deploymentFilePath, ("[config]\ncommand = " + deploymentCommand), __cb(_, __frame, 23, 4, __then, true)); } else { __then(); } ; })(function __$ScriptGenerator_prototype_writeDeploymentFiles__11() {


        log.info("Generated deployment script files"); _(); }); }, true)); });};


function getTemplateContent(templateFileName) {
  return fs.readFileSync(getTemplatePath(templateFileName), "utf8");};


function getTemplatePath(fileName) {
  return path.join(templatesDir, fileName);};


function writeContentToFile(path, content, _) { var __frame = { name: "writeContentToFile", line: 402 }; return __func(_, this, arguments, writeContentToFile, 2, __frame, function __$writeContentToFile() { return (function __$writeContentToFile(__then) {

      if (fs.existsSync(path)) {
        return confirm((("The file: \"" + path) + "\" already exists\nAre you sure you want to overwrite it (y/n): "), __cb(_, __frame, 3, 9, function ___(__0, __2) { var __1 = !__2; return (function __$writeContentToFile(__then) { if (__1) { return _(null); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(function __$writeContentToFile() {





      return fs.writeFile(path, content, __cb(_, __frame, 9, 5, function __$writeContentToFile() { _(); }, true)); }); });};


function argNotNull(arg, argName) {
  if (((arg === null) || (arg === undefined))) {
    throw new Error((("The argument \"" + argName) + "\" is null")); } ;};



exports.ScriptGenerator = ScriptGenerator;
