FuncGodot Manual  

# Conditional Models in TrenchBroom

Let's say we want to add a _misc\_model_ or _prop\_dynamic_ entity class. Wouldn't it be nice if we could change a property and have our map editor reflect that change?

TrenchBroom allows you to modify certain meta property options through the use of an entity's own properties. There is a great example of this in the [TrenchBroom version of Quake's FGD file.](https://github.com/TrenchBroom/TrenchBroom/blob/f2ed84da74107b7a021a972988ed333c990d9b02/app/resources/games/Quake/Quake.fgd) Let's look at an example with **item\_health**, which uses **spawnflags** to determine if the item becomes a Medkit, a Rotten Medkit, or a Megahealth.

```
@PointClass
    size(0 0 0, 32 32 56)
    base(Appearflags)
    model(
        {{
            spawnflags & 2 ->   ":maps/b_bh100.bsp",
            spawnflags & 1 ->   ":maps/b_bh10.bsp",
                                ":maps/b_bh25.bsp"
        }}
    ) =
    item_health : "Health pack"
[
	spawnflags(flags) =
	[
		1 : "Rotten" : 0
		2 : "Megahealth" : 0
	]
]
```

We can see that the pattern is essentially `property expression -> model path`. While this is fine done via flags, it might be better to use a choices if you have a lot of models you wish to choose from. A good template might be:

```
model(
    {{
        model_id == 1 -> {"path": "path/to/model1.glb"},
        model_id == 2 -> {"path": "path/to/model2.glb"},
        model_id == 3 -> {"path": "path/to/model3.glb"},
        "path": "path/to/model0.glb"    // default value
    }}
) = point_entity : "Example point entity description"
[
    model_id(choices) : "An example model enumerator" : "0" =
    [
        0 : "Model 0"
        1 : "Model 1"
        2 : "Model 2"
        3 : "Model 3"
    ]
]
```

We achieve this with a dictionary property we can call **model\_id** and by adding an element to our _Meta Properties_ dictionary with the key **model** and the String value `{{ model_id == 1 -> "path": "path/to/model1.glb", model_id == 2 -> "path": "path/to/model2.glb", model_id == 3 -> "path": "path/to/model3.glb", "path": "path/to/model0.glb" }}`.

This doesn't affect the Godot entity that gets built. You'll still need to make your own script that handles the model swaps upon building in Godot. Should be pretty trivial to use a match statement utilizing your entity's _model\_id_ property though!