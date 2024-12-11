var documenterSearchIndex = {"docs":
[{"location":"toml/#The-TOML-parameter-file-interface","page":"TOML file interface","title":"The TOML parameter file interface","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"The complete user interface consists of two files in TOML format","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"A user-defined experiment file - in the local experiment directory\nA defaults file - in src/ directory of CLIMAParameters.jl","category":"page"},{"location":"toml/#Parameter-style-guide","page":"TOML file interface","title":"Parameter style-guide","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"A parameter is determined by its unique name. It has possible attributes","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"alias\nvalue\ntype\ndescription\nprior\ntransformation","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"warn: Warn\nCurrently we support Type and array{Type} for the following Types: float, integer, string and bool.","category":"page"},{"location":"toml/#Minimal-parameter-requirement-to-run-in-CliMA","page":"TOML file interface","title":"Minimal parameter requirement to run in CliMA","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"[molar_mass_dry_air]\nvalue = 0.03\ntype = \"float\"","category":"page"},{"location":"toml/#A-more-informative-parameter-(e.g.-found-in-the-defaults-file)","page":"TOML file interface","title":"A more informative parameter (e.g. found in the defaults file)","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"[molar_mass_dry_air]\nalias = \"molmass_dryair\"\nvalue = 0.02897\ntype = \"float\"\ndescription = \"Molecular weight dry air (kg/mol)\"","category":"page"},{"location":"toml/#A-more-complex-parameter-for-calibration","page":"TOML file interface","title":"A more complex parameter for calibration","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"[neural_net_entrainment]\nalias = \"c_gen\"\nvalue = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]\ntype = \"array\"\ndescription = \"NN weights to represent the non-dimensional entrainment function\"\nprior = \"MvNormal(0,I)\"","category":"page"},{"location":"toml/#Interaction-of-the-files","page":"TOML file interface","title":"Interaction of the files","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"On read an experiment file, the default file is also read and any duplicate parameter attributes are overwritten e.g. If the minimal example above was loaded from an experiment file, and the informative example above was in the defaults file, then the loaded parameter would look as follows:","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"[molar_mass_dry_air]\nalias = \"molmass_dryair\"\nvalue = 0.03\ntype = \"float\"\ndescription = \"Molecular weight dry air (kg/mol)\"","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"Here, the value field has been overwritten by the experiment value.","category":"page"},{"location":"toml/#File-and-parameter-interaction-on-with-CliMA","page":"TOML file interface","title":"File and parameter interaction on with CliMA","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"CLIMAParameters.jl provides several methods to parse, merge, and log parameter information.","category":"page"},{"location":"toml/#Loading-from-file","page":"TOML file interface","title":"Loading from file","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"We provide the following methods to load parameters from file","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"create_toml_dict(Float64;override_filepath, default_filepath, dict_type=\"alias\")\ncreate_toml_dict(Float64;override_filepath ; dict_type=\"alias\")\ncreate_toml_dict(Float64; dict_type=\"name\")","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"The dict_type = \"name\" or \"alias\" determines the method of lookup of parameters (by name or by alias attributes).\nThe Float64 (or Float32) defines the requested precision of the returned parameters.","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"Typical usage involves passing the local parameter file","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"import CLIMAParameters\nlocal_exp_file = joinpath(@__DIR__,\"local_exp_parameters.toml\")\ntoml_dict = CLIMAParameters.create_toml_dict(;local_exp_file)","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"If no file is passed it will use only the defaults from CLIMAParameters.jl (causing errors if required parameters are not within this list).","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"note: Note\nCurrently we search by the alias field (dict_type=\"alias\" by default), so all parameters need an alias field, if in doubt, set alias and name to match the current code name convention.","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"The parameter dict is then used to build the codebase (see relevant Docs page).","category":"page"},{"location":"toml/#Logging-parameters","page":"TOML file interface","title":"Logging parameters","text":"","category":"section"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"Once the CliMA components are built, it is important to log the parameters. We provide the following method","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"log_parameter_information(toml_dict, filepath; strict=false)","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"Typical usage will be after building components and before running","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"import Thermodynamics\ntherm_params = Thermodynamics.ThermodynamicsParameters(toml_dict)\n#... build(thermodynamics model,therm_params)\n\nlog_file = joinpath(@__DIR__,\"parameter_log.toml\")\nCLIMAParameters.log_parameter_information(toml_dict,log_file)\n\n# ... run(thermodynamics_model)","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"This function performs two tasks","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"It writes a parameter log file to log_file.\nIt performs parameter sanity checks.","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"Continuing our previous example, imagine molar_mass_dry_air was extracted in ThermodynamicsParameters. Then the log file will contain:","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"[molar_mass_dry_air]\nalias = \"molmass_dryair\"\nvalue = 0.03\ntype = \"float\"\ndescription = \"Molecular weight dry air (kg/mol)\"\nused_in = [\"Thermodynamics\"]","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"The additional attribute used_in displays every CliMA component that used this parameter.","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"note: Note\nLog files are written in TOML format, and can be read back into the model.","category":"page"},{"location":"toml/","page":"TOML file interface","title":"TOML file interface","text":"warn: Warn\nIt is assumed that all parameters in the local experiment file should be used, if not a warning is displayed when calling log_parameter_information. This is upgraded to an error exception by changing strict.","category":"page"},{"location":"toml_dicts/#Parameter-Dictionaries","page":"TOML dicts","title":"Parameter Dictionaries","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"Parameters are stored in objects that reflect the model component construction. Definitions should be inserted into the model component source code.","category":"page"},{"location":"toml_dicts/#An-example-from-Thermodynamics.jl","page":"TOML dicts","title":"An example from Thermodynamics.jl","text":"","category":"section"},{"location":"toml_dicts/#In-the-user-facing-driver-file","page":"TOML dicts","title":"In the user-facing driver file","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"import CLIMAParameters\nimport Thermodynamics\n\ntoml_dict = CLIMAParameters.create_toml_dict(;dict_type=\"alias\")\nthermo_params = Thermodynamics.ThermodynamicsParameters(toml_dict)","category":"page"},{"location":"toml_dicts/#In-the-source-code-for-Thermodynamics.jl","page":"TOML dicts","title":"In the source code for Thermodynamics.jl","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"Base.@kwdef struct ThermodynamicsParameters{FT}\n    gas_constant::FT\n    molmass_dryair::FT\n    ...\n    # derived parameters\n    R_d::FT = gas_constant / molmass_dryair\nend","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"The struct is parameterized by {FT} which is a user-determined float precision.\nOnly relevant parameters used in Thermodynamics are stored here.\nA keyword based struct so we do not rely on parameter order.","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"The constructor is as follows","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"function ThermodynamicsParameters(toml_dict)\n\n    # Used in thermodynamics, from parameter file\n    aliases = [ ..., \"gas_constant\", \"molmass_dryair\"]\n\n    param_pairs = CLIMAParameters.get_parameter_values!(\n        toml_dict,\n        aliases,\n        \"Thermodynamics\",\n    )\n    nt = (; param_pairs...)\n\n    FT = CP.float_type(toml_dict)\n    return ThermodynamicsParameters{FT}(; nt...)\nend","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"The constructor takes in a toml_dict produced from reading the TOML file.\nWe list the aliases of parameters required by Thermodynamics.jl.\nWe obtain parameters (in the form of a list of (alias,value) Pairs) from get_parameter_values!(toml_dict,aliases,component_name) The component_name is a string used for the parameter log.\nWe convert to namedtuple for ease of extraction.\nWe create any derived parameters i.e. commonly used simple functions of parameters that are treated as parameters. Here we create the dry air gas constant R_d.\nWe return the ThermodynamicsParameters{FT}, where FT is an enforced float type (e.g. single or double precision).","category":"page"},{"location":"toml_dicts/#An-example-with-modular-components-from-CloudMicrophysics.jl","page":"TOML dicts","title":"An example with modular components from CloudMicrophysics.jl","text":"","category":"section"},{"location":"toml_dicts/#In-the-user-facing-driver-file-2","page":"TOML dicts","title":"In the user-facing driver file","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"Here we build a CloudMicrophysics parameter set. In this case, the user wishes to use a 0-moment microphysics parameterization scheme.","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"import CLIMAParameters\nimport Thermodynamics\nimport CloudMicrophysics\n\n#load defaults\ntoml_dict = CLIMAParameters.create_toml_dict(; dict_type=\"alias\")\n\n#build the low level parameter set\nparam_therm = Thermodynamics.ThermodynamicsParameters(toml_dict)\nparam_0M = CloudMicrophysics.Microphysics_0M_Parameters(toml_dict)\n\n#build the hierarchical parameter set\nparameter_set = CloudMicrophysics.CloudMicrophysicsParameters(\n    toml_dict,\n    param_0M,\n    param_therm\n)","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"note: Note\nThe exact APIs here are subject to change.","category":"page"},{"location":"toml_dicts/#In-the-source-code-for-CloudMicrophysics.jl","page":"TOML dicts","title":"In the source code for CloudMicrophysics.jl","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"Build the different options for a Microphysics parameterizations","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"abstract type AbstractMicrophysicsParameters end\nstruct NoMicrophysicsParameters <: AbstractMicrophysicsParameters end\nBase.@kwdef struct Microphysics_0M_Parameters{FT} <: AbstractMicrophysicsParameters\n    τ_precip::FT\n    qc_0::FT\n    S_0::FT\nend\nBase.@kwdef struct Microphysics_1M_Parameters{FT} <: AbstractMicrophysicsParameters\n    ...\nend","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"We omit their constructors (see above). The CloudMicrophysics parameter set is built likewise","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"Base.@kwdef struct CloudMicrophysicsParameters{FT, AMPS <: AbstractMicrophysicsParameters}\n    K_therm::FT\n    ...\n    MPS::AMPS\n    TPS::ThermodynamicsParameters{FT}\nend\n\n\nfunction CloudMicrophysicsParameters(\n    toml_dict,\n    MPS::AMPS,\n    TPS::ThermodynamicsParameters{FT},\n) where {FT, AMPS <: AbstractMicrophysicsParameters}\n\n    aliases = [ \"K_therm\", ... ]\n\n    param_pairs  = CLIMAParameters.get_parameter_values!(\n        toml_dict,\n        aliases,\n        \"CloudMicrophysics\",\n    )\n\n    nt = (; param_pairs...)\n    #derived parameters\n    ...\n    FT = CP.float_type(toml_dict)\n\n    return CloudMicrophysicsParameters{FT, AMPS}(;\n            nt...,\n            ...\n            MPS,\n            TPS,\n        )\nend","category":"page"},{"location":"toml_dicts/#Calling-parameters-from-src","page":"TOML dicts","title":"Calling parameters from src","text":"","category":"section"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"note: Note\nThe exact APIs here are subject to change.","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"When building the model components, parameters are extracted by calling param_set.name or param_set.alias (currently)","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"function example_cloudmicrophysics_func(param_set::CloudMicrophysicsParameters,...)\n    K_therm = param_set.K_therm\n    ...\nend","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"When calling functions from dependent packages, simply pass the relevant lower_level parameter dict","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"function example_cloudmicrophysics_func(param_set::CloudMicrophysicsParameters,...)\n    thermo_output = Thermodynamics.thermo_function(param_set.TPS,...)\n    cm0_output = Microphysics_0m.microphys_function(param_set.MPS,...)\n    ...\nend","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"These functions should be written with this in mind (dispatching)","category":"page"},{"location":"toml_dicts/","page":"TOML dicts","title":"TOML dicts","text":"function microphys_function(param_set::Microphysics_0M_parameters,...)\n   qc_0 = param_set.qc_0\n   ...\nend","category":"page"},{"location":"#CLIMAParameters.jl","page":"Home","title":"CLIMAParameters.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package contains all of the parameters used across the CliMA organization. Some parameters are simply global constants (e.g., speed of light), while others are parameters that may be tuned in a machine-learning layer that sits on-top of the climate model.","category":"page"},{"location":"#What-parameters-are-good-candidates-for-CLIMAParameters?","page":"Home","title":"What parameters are good candidates for CLIMAParameters?","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CLIMAParameters serve several functionalities and require certain attributes. A parameter is a good candidate for CLIMAParameters if it has all of the following attributes:","category":"page"},{"location":"","page":"Home","title":"Home","text":"The parameter does not vary in space\nThe parameter does not vary in time (per climate simulation)\nThe parameter is a function of only constants other CLIMAParameters and or constants","category":"page"},{"location":"","page":"Home","title":"Home","text":"In addition, CLIMAParameters have the flexibility of two important behaviors:","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"See the The TOML parameter file interface and Parameter Dictionaries for usage examples.","category":"page"},{"location":"API/#API","page":"API","title":"API","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"CurrentModule = CLIMAParameters","category":"page"},{"location":"API/#Parameter-dictionaries","page":"API","title":"Parameter dictionaries","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"AbstractTOMLDict\nParamDict\nAliasParamDict","category":"page"},{"location":"API/#CLIMAParameters.AbstractTOMLDict","page":"API","title":"CLIMAParameters.AbstractTOMLDict","text":"AbstractTOMLDict{FT <: AbstractFloat}\n\nAbstract parameter dict. Two subtypes:\n\nParamDict\nAliasParamDict\n\n\n\n\n\n","category":"type"},{"location":"API/#CLIMAParameters.ParamDict","page":"API","title":"CLIMAParameters.ParamDict","text":"ParamDict(data::Dict, override_dict::Union{Nothing,Dict})\n\nStructure to hold information read-in from TOML file, as well as a parametrization type FT.\n\nUses the name to search\n\nFields\n\ndata: dictionary representing a default/merged parameter TOML file\noverride_dict: either a nothing, or a dictionary representing an override parameter TOML file\n\n\n\n\n\n","category":"type"},{"location":"API/#CLIMAParameters.AliasParamDict","page":"API","title":"CLIMAParameters.AliasParamDict","text":"AliasParamDict(data::Dict, override_dict::Union{Nothing,Dict})\n\nStructure to hold information read-in from TOML file, as well as a parametrization type FT.\n\nUses the alias to search\n\nFields\n\ndata: dictionary representing a default/merged parameter TOML file\noverride_dict: either a nothing, or a dictionary representing an override parameter TOML file\nalias_to_name_map: Alias->name map\n\n\n\n\n\n","category":"type"},{"location":"API/#File-parsing-and-parameter-logging","page":"API","title":"File parsing and parameter logging","text":"","category":"section"},{"location":"API/#User-facing-functions:","page":"API","title":"User facing functions:","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"create_toml_dict\nget_parameter_values!\nget_parameter_values\nfloat_type\nlog_parameter_information\nwrite_log_file","category":"page"},{"location":"API/#CLIMAParameters.create_toml_dict","page":"API","title":"CLIMAParameters.create_toml_dict","text":"create_toml_dict(FT;\n    override_file,\n    default_file,\n    dict_type=\"alias\"\n)\n\nCreates a ParamDict{FT} struct, by reading and merging upto two TOML files with override information taking precedence over default information.\n\n\n\n\n\n","category":"function"},{"location":"API/#CLIMAParameters.get_parameter_values!","page":"API","title":"CLIMAParameters.get_parameter_values!","text":"get_parameter_values!(\n    pd::AbstractTOMLDict,\n    names::Union{String,Vector{String}},\n    component::String\n)\n\n(Note the !) Gets the parameter values, and logs the component (if given) where parameters are used.\n\n\n\n\n\n","category":"function"},{"location":"API/#CLIMAParameters.get_parameter_values","page":"API","title":"CLIMAParameters.get_parameter_values","text":"get_parameter_values(pd::AbstractTOMLDict, names)\n\nGets the parameter values only.\n\n\n\n\n\n","category":"function"},{"location":"API/#CLIMAParameters.float_type","page":"API","title":"CLIMAParameters.float_type","text":"float_type(::AbstractTOMLDict)\n\nThe float type from the parameter dict.\n\n\n\n\n\n","category":"function"},{"location":"API/#CLIMAParameters.log_parameter_information","page":"API","title":"CLIMAParameters.log_parameter_information","text":"log_parameter_information(\n    pd::AbstractTOMLDict,\n    filepath;\n    strict::Bool = false\n)\n\nWrites the parameter log file at filepath; checks that override parameters are all used.\n\nIf strict = true, errors if override parameters are unused.\n\n\n\n\n\n","category":"function"},{"location":"API/#CLIMAParameters.write_log_file","page":"API","title":"CLIMAParameters.write_log_file","text":"write_log_file(pd::AbstractTOMLDict, filepath)\n\nWrites a log file of all used parameters of pd at the filepath. This file can be used to rerun the experiment.\n\n\n\n\n\n","category":"function"}]
}
