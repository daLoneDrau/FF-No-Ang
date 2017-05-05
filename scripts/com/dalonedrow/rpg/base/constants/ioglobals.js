define(function() {
	var IoGlobals = (function () {
		return {
			GFLAG_DOOR					: 1 << 5,
			GFLAG_ELEVATOR				: 1 << 10,
			GFLAG_GOREEXPLODE			: 1 << 14,
			GFLAG_HIDEWEAPON			: 1 << 12,
			GFLAG_INTERACTIVITY			: 1,
			GFLAG_INTERACTIVITYHIDE		: 1 << 4,
			GFLAG_INVISIBILITY			: 1 << 6,
			GFLAG_ISINTREATZONE			: 1 << 1,
			GFLAG_MEGAHIDE				: 1 << 11,
			GFLAG_NEEDINIT				: 1 << 3,
			GFLAG_NO_PHYS_IO_COL		: 1 << 7,
			GFLAG_NOCOMPUTATION			: 1 << 15,
			GFLAG_NOGORE				: 1 << 13,
			GFLAG_PLATFORM				: 1 << 9,
			GFLAG_VIEW_BLOCKER			: 1 << 8,
			GFLAG_WASINTREATZONE		: 1 << 2,
			/** flag indicating the interactive object is a PC. */
			IO_01_PC					: 1,
			/** flag indicating the interactive object is an item. */
			IO_02_ITEM					: 2,
			/** flag indicating the interactive object is an NPC. */
			IO_03_NPC					: 4,
			/** flag indicating the interactive object is a horse object. */
			IO_04_HORSE					: 8,
			/** flag indicating the interactive object is under water. */
			IO_05_UNDERWATER			: 16,
			/** flag indicating the interactive object is a fixable object. */
			IO_06_FREEZESCRIPT			: 32,
			/** flag indicating the interactive object is a fixable object. */
			IO_07_NO_COLLISIONS			: 64,
			/** flag indicating the interactive object is a fixable object. */
			IO_08_INVULNERABILITY		: 128,
			/** flag indicating the interactive object is a dwelling. */
			IO_09_DWELLING				: 256,
			/** flag indicating the interactive object is gold. */
			IO_10_GOLD					: 512,
			/** flag indicating the interactive object has interactivity. */
			IO_11_INTERACTIVITY			: 1024,
			/** flag indicating the interactive object is a treasure. */
			IO_12_TREASURE				: 2048,
			/** flag indicating the interactive object is unique. */
			IO_13_UNIQUE				: 4096,
			/** flag indicating the interactive object is a party. */
			IO_14_PARTY					: 8192,
			/** flag indicating the interactive object is a winged mount. */
			IO_15_MOVABLE				: 16384,

			SHOW_FLAG_NOT_DRAWN:				0,
			SHOW_FLAG_IN_SCENE	:			1,
			SHOW_FLAG_LINKED	:			2,
			SHOW_FLAG_IN_INVENTORY	:		4,	// In Inventory
			SHOW_FLAG_HIDDEN	:			5,	// In Inventory
			SHOW_FLAG_TELEPORTING	:		6,	
			SHOW_FLAG_KILLED	:			7,	// Not Used Yet
			SHOW_FLAG_MEGAHIDE	:			8,
			SHOW_FLAG_ON_PLAYER	:			9,
			SHOW_FLAG_DESTROYED	:			255
		}
	})();
	return IoGlobals;
});