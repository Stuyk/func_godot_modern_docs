FuncGodot Manual  

# FuncGodotParser

MAP and VMF parser class that is instantiated by a [FuncGodotMap](ref_func_godot_map.md) node.

### Signals

|     |     |
| --- | --- |
| Signal | Description |
| declare\_step | Emitted when a step in the parsing process is completed. It is connected to [FuncGodotUtil](ref_util.md)'s `print_profile_info()` method if the FuncGodotMap's _Show Profiling Info_ build flag is set. |

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| parse\_map\_data(map\_file: String, map\_settings: FuncGodotMapSettings) | Parses the map file, generating entity and group data and sub-data, then returns the generated data as an array of arrays. The first array is _Array\[FuncGodotEntityData\]_, while the second array is _Array\[FuncGodotGroupData\]_. | Array\[Array\] |
| \_parse\_quake\_map(map\_data: PackedStringArray, map\_settings: FuncGodotMapSettings) | Parser subroutine called by `parse_map_data()`, specializing in the Quake MAP format. | Array\[Array\] |
| \_parse\_vmf(map\_data: PackedStringArray, map\_settings: FuncGodotMapSettings) | Parser subroutine called by `parse_map_data()`, specializing in the VMF format used by Hammer based editors. | Array\[Array\] |