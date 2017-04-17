function ProjectConstants() {
    /**
     * Gets the height of a console.
     * @return {@link int}
     */
    this.getConsoleHeight = function() {
    	return 0;
    }
    /**
     * Gets the width of a console.
     * @return {@link int}
     */
    this.getConsoleWidth = function() {
    	return 0;
    }
    /**
     * Gets the index of the equipment element for damage.
     * @return {@link int}
     */
    this.getDamageElementIndex = function() {
    	return 0;
    }
    /**
     * Gets the maximum number of equipment slots.
     * @return {@link int}
     */
    this.getMaxEquipped = function() {
    	return 0;
    }
    /**
     * Gets the maximum number of spells.
     * @return {@link int}
     */
    this.getMaxSpells = function() {
    	return 0;
    }
    this.getNumberEquipmentElements = function() {
    	return 0;
    }
    /**
     * Gets the reference id of the player.
     * @return {@link int}
     * @throws RPGException if an error occurs
     */
    this.getPlayer = function() {
    	return 0;
    }
    /** Updates the game. */
    this.update = function() {
    	
    }
    this.isGameOver = function() {
    	return false;
    }
}
ProjectConstants.prototype = Object.create(Hashcode.prototype);
ProjectConstants.getInstance = function() {
	return ProjectConstants.instance;
}
ProjectConstants.setInstance = function(i) {
	if (!(i instanceof ProjectConstants)) {
		throw new Error("Instance must be an ProjectConstants subclass.")
	}
	ProjectConstants.instance = i;
}

