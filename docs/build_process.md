FuncGodot Manual  

# Build Process

# FuncGodotMap

The build process begins and ends with the [FuncGodot Map](ref_func_godot_map.md) node. Clicking the **Build** button calls the `build()` function. The first task it performs is to verify the selected _.map_ or _.vmf_ file. If the file is verified, the Map node will then run through the 3 main steps of the build process:  

*   [Parsing](build_parser.md)
*   [Geometry generation](build_geo_generator.md)  
    
*   [Entity Assembly](build_ent_assembler.md)
  
Each of these steps has their own set of semi-isolated sub processes that take an input from the Map node and feed their output back to it for the Map node to perform the next step. Once each main step has completed, the Map node will emit a final `build_complete` signal.