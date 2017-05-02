/**
 *
 */
define(["require", "com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/rpg/base/constants/behaviourglobals",
	"com/dalonedrow/rpg/base/constants/equipmentglobals",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/behaviourdata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/iopathfind",
	"com/dalonedrow/rpg/base/systems/script"],
		function(require, Interactive, BehaviourGlobals, EquipmentGlobals, IoGlobals, ScriptGlobals,
				BaseInteractiveObject, BehaviourData, IOCharacter, IOPathfind, Script) {
	function IoNpcData() {
		IOCharacter.call(this);
	    this.absorb = 0;
	    this.aiming_start = 0;
	    this.aimtime = 0;
	    this.armor_class = 0;
	    this.armorClass = 0;
	    this.backstab_skill = 0;
	    this.behavior = 0;
	    this.behavior_param = 0;
	    this.climb_count = 0;
	    this.collid_state = 0;
	    this.collid_time = 0;
	    this.critical = 0;
	    this.cut = 0;
	    this.cuts = 0;
	    this.damages = 0;
	    this.detect = 0;
	    this.fDetect = 0;
	    this.fightdecision = 0;
	    /** the {@link IoNpcData}'s gender. */
	    this.gender = null;
	    /** the IO associated with this {@link IoNpcData}. */
	    this.io = null;
	    this.lastmouth = 0;
	    this.life = 0;
	    this.look_around_inc = 0;
	    this.ltemp = 0;
	    this.mana = 0;
	    this.maxlife = 0;
	    this.maxmana = 0;
	    this.movemode = 0;
	    this.moveproblem = 0;
	    /** the {@link IoNpcData}'s name. */
	    this.name = "";
	    /** all NPC flags. */
	    this.npcFlags = 0;
	    // IO_PATHFIND pathfind;
	    // EERIE_EXTRA_ROTATE * ex_rotate;
	    // D3DCOLOR blood_color;
	    this.padd = '';
	    this.pathfinder = null;
	    // IO_BEHAVIOR_DATA stacked[MAX_STACKED_BEHAVIOR];
	    this.poisonned = 0;
	    this.reach = 0;
	    this.reachedtarget = false; // Is
	    // target
	    // in
	    // REACHZONE ?
	    this.reachedtime = 0;
	    this.resist_fire = '';
	    this.resist_magic;
	    this.resist_poison;
	    this.speakpitch = 0;
	    this.splatDamages = 0;
	    this.splatTotNb = 0;
	    /** the stack of behaviors. */
	    this.stacked = null;
	    this.stare_factor = 0;
	    this.strike_time = 0;
	    this.tactics = 0; // 0=none
	    this.targetInfo = 0;
	    // ;
	    /** the {@link IoNpcData}'s title. */
	    this.title = null;
	    // 1=side ;
	    // 2=side+back
	    this.tohit = 0;
	    this.unused = 0;
	    // EERIE_3D last_splat_pos;
	    this.vvpos = 0;
	
	    this.walk_start_time = 0;
	    /** the NPC's weapon. */
	    this.weapon = null;
	    this.weaponInHand = 0;
	    this.weaponname = "";
	    this.weapontype = 0;
	    this.xpvalue = 0;
        this.stacked = [];
        for (var i = 0; i < IoNpcData.MAX_STACKED_BEHAVIOR; i++) {
        	this.stacked.push(new BehaviourData());
        }
        this.pathfinder = new IOPathfind();
	}
	IoNpcData.prototype = Object.create(IOCharacter.prototype);
	IoNpcData.MAX_STACKED_BEHAVIOR = 5;
    /**
     * Adds a behavior flag.
     * @param flag the flag
     */
    IoNpcData.prototype.addBehavior = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.addBehavior() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.behavior |= behaviorEnum.getFlag();
    }
    /**
     * Adds an NPC flag.
     * @param flag the flag
     */
    IoNpcData.prototype.addNPCFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.addNPCFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.npcFlags |= flag;
    }
    /**
     * Applies extra damage from a poisoned attack.
     * @param srcIoid the source of the damage
     * @param isSpellDamage flag indicating whether the damage is from a spell
     * @if an error occurs
     */
    IoNpcData.prototype.applyPoisonDamage = function(srcIoid, isSpellDamage) {
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.applyPoisonDamage() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isSpellDamage);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.applyPoisonDamage() - isSpellDamage ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (Interactive.getInstance().hasIO(srcIoid)) {
            var poisonWeaponIO = null;
            var sourceIO = Interactive.getInstance().getIO(srcIoid);
            if (sourceIO.hasIOFlag(IoGlobals.IO_01_PC)) {
            	var player = sourceIO.getPCData();
                if (player.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON) > 0
                        && Interactive.getInstance().hasIO(player.getEquippedItem(
                        		EquipmentGlobals.EQUIP_SLOT_WEAPON))) {
                    poisonWeaponIO = Interactive.getInstance().getIO(player.getEquippedItem(
                    		EquipmentGlobals.EQUIP_SLOT_WEAPON));

                    if (poisonWeaponIO !== null
                            && (poisonWeaponIO.getPoisonLevel() === 0
                            		|| poisonWeaponIO.getPoisonCharges() === 0)
                            || isSpellDamage) {
                        poisonWeaponIO = null;
                    }
                }
            } else {
                if (sourceIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
                    poisonWeaponIO = sourceIO.getNPCData().getWeapon();
                    if (poisonWeaponIO !== null
                            && (poisonWeaponIO.getPoisonLevel() === 0
                                    || poisonWeaponIO.getPoisonCharges() === 0)) {
                        poisonWeaponIO = null;
                    }
                }
            }
            if (poisonWeaponIO === null) {
                poisonWeaponIO = sourceIO;
            }
            if (poisonWeaponIO !== null
                    && poisonWeaponIO.getPoisonLevel() > 0
                    && poisonWeaponIO.getPoisonCharges() > 0) {
                // TODO - apply poison damage

                // reduce poison level on attacking weapon
                if (poisonWeaponIO.getPoisonCharges() > 0) {
                    poisonWeaponIO.setPoisonCharges(poisonWeaponIO.getPoisonCharges() - 1);
                }
            }
            sourceIO = null;
            poisonWeaponIO = null;
        }
    }
    /**
     * Drains mana from the NPC, returning the full amount drained.
     * @param dmg the attempted amount of mana to be drained
     * @return {@link float}
     */
    IoNpcData.prototype.ARX_DAMAGES_DrainMana = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.ARX_DAMAGES_DrainMana() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var manaDrained = 0;
        if (this.getBaseMana() >= dmg) {
        	this.adjustMana(-dmg);
            manaDrained = dmg;
        } else {
            manaDrained = getBaseMana();
            this.adjustMana(-manaDrained);
        }
        return manaDrained;
    }
    /**
     * Heals the NPC's mana.
     * @param dmg the amount of healing
     */
    IoNpcData.prototype.ARX_DAMAGES_HealManaInter = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.ARX_DAMAGES_HealManaInter() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.getBaseLife() > 0) {
            if (dmg > 0) {
            	this.adjustMana(dmg);
            }
        }
    }
    IoNpcData.prototype.ARX_NPC_Behaviour_Change = function(newBehavior, params) {
    	try {
    		this.checkPowerOfTwo(newBehavior);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.ARX_NPC_Behaviour_Change() - newBehavior ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.ARX_NPC_Behaviour_Change() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.hasBehavior(BehaviourGlobals.BEHAVIOUR_FIGHT)
                && (newBehavior & BehaviourGlobals.BEHAVIOUR_FIGHT)
                		=== BehaviourGlobals.BEHAVIOUR_FIGHT) {
        	this.stopActiveAnimation();
            // ANIM_USE * ause1 = &io->animlayer[1];
            // AcquireLastAnim(io);
            // FinishAnim(io, ause1->cur_anim);
            // ause1->cur_anim = NULL;
        }

        if (this.hasBehavior(BehaviourGlobals.BEHAVIOUR_NONE)
                && (newBehavior & BehaviourGlobals.BEHAVIOUR_NONE)
                	=== BehaviourGlobals.BEHAVIOUR_NONE) {
        	this.stopIdleAnimation();
            // ANIM_USE * ause0 = &io->animlayer[0];
            // AcquireLastAnim(io);
            // FinishAnim(io, ause0->cur_anim);
            // ause0->cur_anim = NULL;
            // ANIM_Set(ause0, io->anims[ANIM_DEFAULT]);
            // ause0->flags &= ~EA_LOOP;

        	this.stopActiveAnimation();
            // ANIM_USE * ause1 = &io->animlayer[1];
            // AcquireLastAnim(io);
            // FinishAnim(io, ause1->cur_anim);
            // ause1->cur_anim = NULL;
            // ause1->flags &= ~EA_LOOP;

            // stop whatever animation this is
            // ANIM_USE * ause2 = &io->animlayer[2];
            // AcquireLastAnim(io);
            // FinishAnim(io, ause2->cur_anim);
            // ause2->cur_anim = NULL;
            // ause2->flags &= ~EA_LOOP;
        }

        if ((newBehavior & BehaviourGlobals.BEHAVIOUR_FRIENDLY)
        		=== BehaviourGlobals.BEHAVIOUR_FRIENDLY) {
        	this.stopIdleAnimation();
            // ANIM_USE * ause0 = &io->animlayer[0];
            // AcquireLastAnim(io);
            // FinishAnim(io, ause0->cur_anim);
            // ANIM_Set(ause0, io->anims[ANIM_DEFAULT]);
            // ause0->altidx_cur = 0;
        }
        this.clearBehavior();
        this.behavior = newBehavior;
        this.behavior_param = params;
    }
    IoNpcData.prototype.ARX_NPC_Behaviour_Stack = function() {
        for (var i = 0; i < IoNpcData.MAX_STACKED_BEHAVIOR; i++) {
            var bd = this.stacked[i];
            if (!bd.exists()) {
                bd.setBehaviour(behavior);
                bd.setBehaviorParam(behavior_param);
                bd.setTactics(tactics);
                // set pathfinding information
                // if (io->_npcdata->pathfind.listnb > 0)
                // bd->target = io->_npcdata->pathfind.truetarget;
                // else
                // bd->target = io->targetinfo;

                bd.setMovemode(movemode);
                bd.setExists(true);
                return;
            }
        }
    }
    IoNpcData.prototype.ARX_NPC_Behaviour_UnStack = function() {
        for (var i = 0; i < IoNpcData.MAX_STACKED_BEHAVIOR; i++) {
            var bd = this.stacked[i];
            if (bd.exists()) {
                // AcquireLastAnim(io);
            	this.behavior = bd.getBehaviour();
            	this.behavior_param = bd.getBehaviorParam();
                this.tactics = bd.getTactics();
                this.targetInfo = bd.getTarget();
                this.movemode = bd.getMoveMode();
                bd.setExists(false);
                // ARX_NPC_LaunchPathfind(io, bd->target);

                if (this.hasBehavior(BehaviourGlobals.BEHAVIOUR_NONE)) {
                    // memcpy(io->animlayer, bd->animlayer,
                    // sizeof(ANIM_USE)*MAX_ANIM_LAYERS);
                }
            }
        }
    }
    /**
     * Revives the NPC.
     * @param reposition if <tt>true</tt> NPC is moved to their initial position
     * @if an error occurs
     */
    IoNpcData.prototype.ARX_NPC_Revive = function(reposition) {
    	try {
    		this.checkBoolean(reposition);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.ARX_NPC_Revive() - reposition ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO - check if secondary inventory belongs to the NPC
        // and kill it
        // if ((TSecondaryInventory) && (TSecondaryInventory->io === io)) {
        // TSecondaryInventory = NULL;
        // }

        Script.getInstance().setMainEvent(this.getIo(), "MAIN");

        this.getIo().removeIOFlag(IoGlobals.IO_07_NO_COLLISIONS);
        this.restoreLifeToMax();
        Script.getInstance().resetObject(this.io, true);
        this.restoreLifeToMax();

        if (reposition) {
            this.moveToInitialPosition();
        }
        // reset texture - later
        // long goretex = -1;

        // for (long i = 0; i < io->obj->nbmaps; i++) {
        // if (io->obj->texturecontainer
        // && io->obj->texturecontainer[i]
        // && (IsIn(io->obj->texturecontainer[i]->m_strName, "GORE"))) {
        // goretex = i;
        // break;
        // }
        // }

        // for (long ll = 0; ll < io->obj->nbfaces; ll++) {
        // if (io->obj->facelist[ll].texid !== goretex) {
        // io->obj->facelist[ll].facetype &= ~POLY_HIDE;
        // } else {
        // io->obj->facelist[ll].facetype |= POLY_HIDE;
        // }
        // }

        this.cuts = 0;
    }
    /** Clears all behavior flags that were set. */
    IoNpcData.prototype.clearBehavior = function() {
    	this.behavior = 0;
    }
    /** Clears all NPC flags that were set. */
    IoNpcData.prototype.clearNPCFlags = function() {
    	this.npcFlags = 0;
    }
    /**
     * Damages an NPC.
     * @param dmg the amount of damage
     * @param srcIoid the source of the damage
     * @param isSpellDamage flag indicating whether the damage is from a spell
     * @return {@link float}
     * @if an error occurs
     */
    IoNpcData.prototype.damageNPC = function(dmg, srcIoid, isSpellDamage) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.damageNPC() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.damageNPC() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isSpellDamage);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.damageNPC() - isSpellDamage ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var damagesdone = 0;
        if (this.io.getShow() > 0
                && !this.io.hasIOFlag(IoGlobals.IO_08_INVULNERABILITY)) {
            if (this.getBaseLife() <= 0) {
            	this.damageNonLivingNPC(dmg, srcIoid, isSpellDamage);
            } else {
                // send OUCH event
            	this.sendOuchEvent(dmg, srcIoid);
                // TODO - remove Confusion spell when hit

                if (dmg >= 0) {
                    this.applyPoisonDamage(srcIoid, isSpellDamage);
                    var accepted = ScriptGlobals.ACCEPT;
                    // if IO has a script, send HIT event
                    if (this.io.getScript() !== null) {
                        accepted = this.sendHitEvent(dmg, srcIoid, isSpellDamage);
                    }
                    // if HIT event doesn't handle damage, handle it here
                    if (accepted === ScriptGlobals.ACCEPT) {
                        damagesdone = this.processDamage(dmg, srcIoid);
                    }
                }
            }
        }
        return damagesdone;
    }
    /**
     * Forces the NPC to die.
     * @param killerIO the IO that killed the NPC
     * @if an error occurs
     */
    IoNpcData.prototype.forceDeath = function(killerIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(killerIO, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.forceDeath() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.io.getMainevent() === null
                || (this.io.getMainevent() !== null
                        && !this.io.getMainevent().equalsIgnoreCase("DEAD"))) {
            var oldSender = Script.getInstance().getEventSender();
            Script.getInstance().setEventSender(killerIO);

            // TODO - reset drag IO
            // if (io === DRAGINTER)
            // Set_DragInter(NULL);

            // TODO - reset flying over (with mouse) IO
            // if (io === FlyingOverIO)
            // FlyingOverIO = NULL;

            // TODO - reset camera 1 when pointing to IO
            // if ((MasterCamera.exist & 1) && (MasterCamera.io === io))
            // MasterCamera.exist = 0;

            // TODO - reset camera 2 when pointing to IO
            // if ((MasterCamera.exist & 2) && (MasterCamera.want_io === io))
            // MasterCamera.exist = 0;

            // TODO - kill dynamic lighting for IO
            // if (ValidDynLight(io->dynlight))
            // DynLight[io->dynlight].exist = 0;

            // io->dynlight = -1;

            // if (ValidDynLight(io->halo.dynlight))
            // DynLight[io->halo.dynlight].exist = 0;

            // io->halo.dynlight = -1;

            // reset all behaviors
            this.resetBehavior();

            // TODO - kill speeches
            // ARX_SPEECH_ReleaseIOSpeech(io);

            // Kill all Timers...
            Script.getInstance().timerClearByIO(this.io);

            if (this.io.getMainevent() === null
                    || (this.io.getMainevent() !== null
                            && !this.io.getMainevent().equalsIgnoreCase("DEAD"))) {
                Script.getInstance().notifyIOEvent(this.io, ScriptConsts.SM_017_DIE, "");
            }

            if (Interactive.getInstance().hasIO(this.io)) {
            	this.io.setMainevent("DEAD");

                // TODO - kill animations
                // if (EEDistance3D(&io_dead->pos, &ACTIVECAM->pos) > 3200) {
                // io_dead->animlayer[0].ctime = 9999999;
                // io_dead->lastanimtime = 0;
                // }

                // set killer
                var killer = "";

                this.setWeaponInHand(-1);

                Interactive.getInstance().ARX_INTERACTIVE_DestroyDynamicInfo(this.io);

                // set killer name
                if (killerIO !== null
                        && killerIO.hasIOFlag(IoGlobals.IO_01_PC)) {
                    killer = "PLAYER";
                } else if (killerIO !== null
                        && killerIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
                    killer = new String(killerIO.getNPCData().getName());
                }
                var i = Interactive.getInstance().getMaxIORefId();
                for (; i >= 0; i--) {
                    if (!Interactive.getInstance().hasIO(i)) {
                        continue;
                    }
                    var ioo = Interactive.getInstance().getIO(i);
                    if (ioo === null) {
                        continue;
                    }
                    if (ioo.equals(this.io)) {
                        continue;
                    }
                    if (ioo.hasIOFlag(IoGlobals.IO_03_NPC)) {
                        if (Interactive.getInstance().hasIO(ioo.getTargetinfo())) {
                            if (Interactive.getInstance().getIO(ioo.getTargetinfo()).equals(io)) {
                                Script.getInstance().setEventSender(this.io);
                                Script.getInstance().stackSendIOScriptEvent(ioo,
                                        0,
                                        ["killer", killer],
                                        "onTargetDeath");
                                ioo.setTargetinfo(IoGlobals.TARGET_NONE);
                                ioo.getNPCData().setReachedtarget(false);
                            }
                        }
                        // TODO - handle pathfinding target cleanup
                        // if (ValidIONum(ioo->_npcdata->pathfind.truetarget)) {
                        // if (inter.iobj[ioo->_npcdata->pathfind.truetarget] ==
                        // io_dead) {
                        // EVENT_SENDER = io_dead;
                        // Stack_SendIOScriptEvent(inter.iobj[i], 0, killer,
                        // "TARGET_DEATH");
                        // ioo->_npcdata->pathfind.truetarget = TARGET_NONE;
                        // ioo->_npcdata->reachedtarget = 0;
                        // }
                        // }
                    }
                }

                // TODO - kill animations
                // IO_UnlinkAllLinkedObjects(io_dead);
                // io_dead->animlayer[1].cur_anim = NULL;
                // io_dead->animlayer[2].cur_anim = NULL;
                // io_dead->animlayer[3].cur_anim = NULL;

                // reduce life to 0
                this.adjustLife(-99999);

                if (this.getWeapon() !== null) {
                    var wpnIO = getWeapon();
                    if (Interactive.getInstance().hasIO(wpnIO)) {
                        wpnIO.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
                        wpnIO.addIOFlag(IoGlobals.IO_07_NO_COLLISIONS);
                        // TODO - reset positioning and velocity
                        // ioo->pos.x =
                        // ioo->obj->vertexlist3[ioo->obj->origin].v.x;
                        // ioo->pos.y =
                        // ioo->obj->vertexlist3[ioo->obj->origin].v.y;
                        // ioo->pos.z =
                        // ioo->obj->vertexlist3[ioo->obj->origin].v.z;
                        // ioo->velocity.x = 0.f;
                        // ioo->velocity.y = 13.f;
                        // ioo->velocity.z = 0.f;
                        // ioo->stopped = 0;
                    }
                }
            }
            Script.getInstance().setEventSender(oldSender);
        }
    }
    /**
     * Gets the armorClass
     * @return {@link float}
     */
    IoNpcData.prototype.getArmorClass = function() {
        return this.armorClass;
    }
    /**
     * Gets the {@link IoNpcData}'s gender.
     * @return int
     */
    IoNpcData.prototype.getGender = function() {
        return this.gender;
    }
    /**
     * Gets the IO associated with this {@link IoNpcData}.
     * @return {@link IO}
     */
    IoNpcData.prototype.getIo = function() {
        return this.io;
    }
    /**
     * Gets the value for the movemode.
     * @return {@link int}
     */
    IoNpcData.prototype.getMovemode = function() {
        return this.movemode;
    }
    /**
     * Gets the {@link IoNpcData}'s name.
     * @return char[]
     */
    IoNpcData.prototype.getName = function() {
        return this.name;
    }
    IoNpcData.prototype.getPathfinding = function() {
        return this.pathfinder;
    }
    /**
     * Gets the splatDamages
     * @return {@link int}
     */
    IoNpcData.prototype.getSplatDamages = function() {
        return this.splatDamages;
    }
    /**
     * Gets the splatTotNb
     * @return {@link int}
     */
    IoNpcData.prototype.getSplatTotNb = function() {
        return this.splatTotNb;
    }
    /**
     * Gets the value for the tactics.
     * @return {@link int}
     */
    IoNpcData.prototype.getTactics = function() {
        return this.tactics;
    }
    /**
     * Gets the {@link IoNpcData}'s title.
     * @return char[]
     */
    IoNpcData.prototype.getTitle = function() {
        return this.title;
    }
    /**
     * Gets the NPC's weapon.
     * @return {@link IO}
     */
    IoNpcData.prototype.getWeapon = function() {
        return this.weapon;
    }
    /**
     * Gets the value for the weaponInHand.
     * @return {@link int}
     */
    IoNpcData.prototype.getWeaponInHand = function() {
        return this.weaponInHand;
    }
    /**
     * Gets the value for the xpvalue.
     * @return {@link int}
     */
    IoNpcData.prototype.getXpvalue = function() {
        return this.xpvalue;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific behavior
     * flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    IoNpcData.prototype.hasBehavior = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.hasBehavior() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return (this.behavior & flag) === flag;
    }
    /**
     * Determines if the {@link IoNpcData} has a specific flag.
     * @param flag the flag
     * @return true if the {@link IoNpcData} has the flag; false otherwise
     */
    IoNpcData.prototype.hasNPCFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.hasNPCFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return (this.npcFlags & flag) === flag;
    }
    /**
     * Gets the value for the reachedtarget.
     * @return {@link long}
     */
    IoNpcData.prototype.hasReachedtarget = function() {
        return this.reachedtarget;
    }
    /**
     * Heals an NPC for a specific amount.
     * @param healAmt the healing amount
     */
    IoNpcData.prototype.healNPC = function(healAmt) {
    	try {
    		this.checkFloat(healAmt);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.healNPC() - healAmt ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.getBaseLife() > 0) {
            if (healAmt > 0) {
            	this.adjustLife(healAmt);
            }
        }
    }
    /**
     * Determines if an NPC is dead.
     * @return <tt>true</tt> if the NPC is dead; <tt>false</tt> otherwise
     */
    IoNpcData.prototype.IsDeadNPC = function() {
        var dead = false;
        if (!this.hasLifeRemaining()) {
            dead = true;
        }
        if (!dead
                && this.io.getMainevent() !== null
                && this.io.getMainevent().equalsIgnoreCase("DEAD")) {
            dead = true;
        }
        return dead;
    }
    /**
     * @param dmg
     * @param srcIoid
     * @return
     * @throws RPGException
     */
    IoNpcData.prototype.processDamage = function(dmg, srcIoid) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.processDamage() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.processDamage() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var damagesdone = Math.min(dmg, this.getBaseLife());
        this.adjustLife(-dmg);
        if (this.getBaseLife() <= 0) { // NPC is dead
            // base life should be 0
            if (Interactive.getInstance().hasIO(srcIoid)) {
                var xp = this.xpvalue;
                var srcIO = Interactive.getInstance().getIO(srcIoid);
                this.forceDeath(srcIO);
                if (srcIO.hasIOFlag(IoGlobals.IO_01_PC)) {
                	this.awardXpForNpcDeath(xp, srcIO);
                }
            } else {
            	this.forceDeath(null);
            }
        }
        return damagesdone;
    }
    /**
     * Removes a behavior flag.
     * @param flag the flag
     */
    IoNpcData.prototype.removeBehavior = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.removeBehavior() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.behavior &= ~flag;
    }
    /**
     * Removes an NPC flag.
     * @param flag the flag
     */
    IoNpcData.prototype.removeNPCFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.removeNPCFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.npcFlags &= ~flag;
    }
    /** Resets the behavior. */
    IoNpcData.prototype.resetBehavior = function() {
    	this.behavior = BehaviourGlobals.BEHAVIOUR_NONE;
        for (var i = 0; i < IoNpcData.MAX_STACKED_BEHAVIOR; i++) {
            if (this.stacked[i] === null) {
            	this.stacked[i] = new BehaviourData();
            }
            this.stacked[i].setExists(false);
        }
    }
    /**
     * Sends the NPC IO a 'Hit' event.
     * @param dmg the amount of damage
     * @param srcIoid the source of the damage
     * @param isSpellDamage flag indicating whether the damage is from a spell
     * @if an error occurs
     */
    IoNpcData.prototype.sendHitEvent = function(dmg, srcIoid, isSpellDamage) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.sendHitEvent() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.sendHitEvent() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isSpellDamage);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.sendHitEvent() - isSpellDamage ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (Interactive.getInstance().hasIO(srcIoid)) {
            Script.getInstance().setEventSender(Interactive.getInstance().getIO(srcIoid));
        } else {
            Script.getInstance().setEventSender(null);
        }

        var params;
        if (Script.getInstance().getEventSender() !== null
                && Script.getInstance().getEventSender().hasIOFlag(IoGlobals.IO_01_PC)) {
        	var plrIO = Script.getInstance().getEventSender();
            if (isSpellDamage) {
                params = ["SPELL_DMG", dmg ];
            } else {
            	var wpnId = plrIO.getPCData().getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
            	var wpnIO = Interactive.getInstance().getIO(wpnId);
            	var wpnType = EquipmentGlobals.WEAPON_BARE;
                if (wpnIO !== null) {
                    wpnType = wpnIO.getItemData().getWeaponType();
                }
                switch (wpnType) {
                case EquipmentGlobals.WEAPON_BARE:
                    params = [ "BARE_DMG", dmg ];
                    break;
                case EquipmentGlobals.WEAPON_DAGGER:
                    params = [ "DAGGER_DMG", dmg ];
                    break;
                case EquipmentGlobals.WEAPON_1H:
                    params = [ "1H_DMG", dmg ];
                    break;
                case EquipmentGlobals.WEAPON_2H:
                    params = [ "2H_DMG", dmg ];
                    break;
                case EquipmentGlobals.WEAPON_BOW:
                    params = [ "ARROW_DMG", dmg ];
                    break;
                default:
                    params = [ "DMG", dmg ];
                    break;
                }
                wpnIO = null;
            }
            plrIO = null;
        } else {
            params = new [ "DMG", dmg ];
        }
        // if player summoned object causing damage,
        // change event sender to player
        if (summonerIsPlayer(Script.getInstance().getEventSender())) {
            var summonerIO = Interactive.getInstance().getIO(
            		Script.getInstance().getEventSender().getSummoner());
            Script.getInstance().setEventSender(summonerIO);
            summonerIO = null;
            params = [ "SUMMONED_DMG", dmg ];
        } else {
            params = ["SUMMONED_OUCH", 0,
                    "OUCH", io.getDamageSum() ];
        }
        return Script.getInstance().sendIOScriptEvent(
        		this.io, ScriptConsts.SM_016_HIT, params, null);
    }
    /**
     * Sends the NPC IO an 'Ouch' event.
     * @param dmg the amount of damage
     * @param srcIoid the source of the damage
     * @if an error occurs
     */
    IoNpcData.prototype.sendOuchEvent = function(dmg, srcIoid) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.sendOuchEvent() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.sendOuchEvent() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.io.setDamageSum(io.getDamageSum() + dmg);
        // set the event sender
        if (Interactive.getInstance().hasIO(srcIoid)) {
            Script.getInstance().setEventSender(Interactive.getInstance().getIO(srcIoid));
        } else {
            Script.getInstance().setEventSender(null);
        }
        // check to see if the damage is coming from a summoned object
        var params;
        if (summonerIsPlayer(Script.getInstance().getEventSender())) {
            params = [ "SUMMONED_OUCH", this.io.getDamageSum(),
                    "OUCH", 0 ];
        } else {
            params = [ "SUMMONED_OUCH", 0,
                    "OUCH", this.io.getDamageSum() ];
        }
        Script.getInstance().sendIOScriptEvent(io,
                ScriptConsts.SM_045_OUCH, params, null);
        this.io.setDamageSum(0);
    }
    /**
     * Sets the armorClass
     * @param val the armorClass to set
     */
    IoNpcData.prototype.setArmorClass = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setArmorClass() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.armorClass = val;
    }
    /**
     * Sets the {@link IoNpcData}'s gender.
     * @param val the gender to set
     */
    IoNpcData.prototype.setGender = function(val) {
    	try {
    		this.checkInstanceOfNullsAllowed(val, Gender);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setGender() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.gender = val;
    	this.notifyWatchers();
    }
    /**
     * Sets the IO associated with this {@link IoNpcData}.
     * @param newIO the IO to set
     */
    IoNpcData.prototype.setIo = function(newIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(newIO, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setIo() - newIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.io = newIO;
    }
    /**
     * Sets the value of the movemode.
     * @param val the new value to set
     */
    IoNpcData.prototype.setMovemode = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setMovemode() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.movemode = val;
    }
    /**
     * Sets the {@link IoNpcData}'s name.
     * @param val the name to set
     */
    IoNpcData.prototype.setName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.name = val;
    	this.notifyWatchers();
    }
    /**
     * Sets the value of the reachedtarget.
     * @param val the new value to set
     */
    IoNpcData.prototype.setReachedtarget = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setReachedtarget() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.reachedtarget = val;
    }
    /**
     * Sets the splatDamages
     * @param splatDamages the splatDamages to set
     */
    IoNpcData.prototype.setSplatDamages = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setSplatDamages() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.splatDamages = val;
    }
    /**
     * Sets the splatTotNb
     * @param splatTotNb the splatTotNb to set
     */
    IoNpcData.prototype.setSplatTotNb = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setSplatTotNb() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.splatTotNb = val;
    }
    /**
     * Sets the value of the tactics.
     * @param val the new value to set
     */
    IoNpcData.prototype.setTactics = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setTactics() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.tactics = val;
    }
    /**
     * Sets the {@link IoPcData}'s title.
     * @param val the title to set
     */
    IoNpcData.prototype.setTitle = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setTitle() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.title = val;
    	this.notifyWatchers();
    }
    /**
     * Sets the NPC's weapon.
     * @param wpnIO the weapon to set
     */
    IoNpcData.prototype.setWeapon = function(wpnIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(wpnIO, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setWeapon() - wpnIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.weapon = wpnIO;
        if (weapon !== null) {
        	this.weaponInHand = weapon.getRefId();
        } else {
        	this.weaponInHand = -1;
        }
    }
    /**
     * Sets the value of the weaponInHand.
     * @param ioid the new value to set
     * @if an error occurs
     */
    IoNpcData.prototype.setWeaponInHand = function(ioid) {
    	try {
    		this.checkInteger(ioid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setWeaponInHand() - ioid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.weaponInHand = ioid;
        if (Interactive.getInstance().hasIO(weaponInHand)) {
        	this.weapon = Interactive.getInstance().getIO(weaponInHand);
        } else {
        	this.weapon = null;
        }
    }
    /**
     * Sets the value of the xpvalue.
     * @param val the new value to set
     */
    IoNpcData.prototype.setXpvalue = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setXpvalue() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.xpvalue = val;
    }
    /**
     * Determines if a summoned IO's summoner is a PC.
     * @param io the IO
     * @return <tt>true</tt> if the summoner is a player; <tt>false</tt>
     *         otherwise
     * @if an error occurs
     */
    IoNpcData.prototype.summonerIsPlayer = function(io) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.summonerIsPlayer() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var isPlayer = false;
        if (this.io !== null) {
            var summonerId = io.getSummoner();
            if (Interactive.getInstance().hasIO(summonerId)) {
                var summoner = Interactive.getInstance().getIO(summonerId);
                if (summoner.hasIOFlag(IoGlobals.IO_01_PC)) {
                    isPlayer = true;
                }
                summoner = null;
            }
        }
        return isPlayer;
    }
    return IoNpcData;
});
