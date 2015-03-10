import world.*;
import world.sound.tunes.*;
import image.*;
import tester.*;
import java.util.*;

//Represents a Grid Position
abstract class AGrid extends Posn{
    int WIDTH_CELLS = 20;
    int HEIGHT_CELLS = 15;
    
    int WIDTH = this.WIDTH_CELLS * 5;
    int HEIGHT = this.HEIGHT_CELLS * 6;
    
    AGrid(int x, int y){
        super(x,y);
    }
   
}

//represents one of the buttons on the display
class Button extends AGrid{
	boolean clicked;
	
	Image acnylon = new Overlay(new Text("Acoustic - Nylon", 15, "Black"), 
			new Rectangle(150, 30, "solid", "red"));
	
	Image acsteel = new Overlay(new Text("Acoustic - Steel", 15, "Black"), 
			new Rectangle(150, 30, "solid", "red"));
	
	Image elclean = new Overlay(new Text("Electric - Clean", 15, "Black"), 
			new Rectangle(150, 30, "solid", "red"));
	
	Image eljazz = new Overlay(new Text("Electric - Jazz", 15, "Black"), 
			new Rectangle(150, 30, "solid", "red"));
	
	Button(int x, int y, boolean clicked){
		super(x, y);
		this.clicked = clicked;
	}
	
	public Scene draw(int i, Scene scn){
		if(i == 0){
			return scn.placeImage(acnylon, x, y);
		}
		else{
			if(i == 1){
				return scn.placeImage(acsteel, x, y);
			}
			else{
				if(i == 2){
					return scn.placeImage(elclean, x, y);
				}
				else{
					return scn.placeImage(eljazz, x, y);
				}
			}
		}
	}
	
}


//represents a fret on a guitar neck
class Fret extends AGrid{
	boolean clicked;
	Note note;
	int string;
	
	 Image fret = new Overlay(new Rectangle(3, 60, "solid", "gray"),
			 new OverlayXY(new Rectangle(30, 55, "solid", "brown"), 0, 55, 
			 new Rectangle(30, 5, "solid", "black")));
	 
	 Image fretclicked = new Overlay(new Circle(8, "solid", "green"),
			 new Overlay(new Rectangle(3, 60, "solid", "gray"), 
			 new OverlayXY(new Rectangle(30, 55, "solid", "brown"), 0, 55, 
					 new Rectangle(30, 5, "solid", "black"))));
	 
	 Image openclicked = new Overlay(new Circle(8, "solid", "green"), 
			 new Overlay(new Rectangle(3, 10, "solid", "gray"), 
			 new Rectangle(30, 10, "solid", "black" )));
	 
	 Image open = new Overlay(new Rectangle(3, 10, "solid", "gray"), 
			 new Rectangle(30, 10, "solid", "black" ));
	
	Fret(int x, int y, boolean clicked, Note note, int string){
		super(x, y);
		this.clicked = clicked;
		this.note = note;
		this.string = string;
	}

	/** Determines if the fret has been clicked on mouse event*/
	public boolean isClicked(int x2, int y2){
		if(this.y < 40){
			return  (x2 >= this.x-15)&&(x2 <= this.x + 15)&&
					(y2 >= this.y-5)&&(y2 <= this.y + 5);	
		}
		else{
			return  (x2 >= this.x-15)&&(x2 <= this.x + 15)&&
					(y2 >= this.y-22)&&(y2 <= this.y + 22);	
		}
	}
	
	/** Toggles click from off to on and vice versa */
	public void toggleClick(){
			this.clicked = !this.clicked;
	}

	
	/** Draws this fret at its coordinates on the scene. */
	public Scene drawFret(Scene scn){
		if(this.y < 40){
			if(this.clicked){
				return scn.placeImage(openclicked, x, y);
			}
			else{
				return scn.placeImage(open, x, y);
			}
		}
		else{
			if(this.clicked){
				return scn.placeImage(fretclicked, x, y);
			}
			else{
				return scn.placeImage(fret, x, y);
			}
	}
	}

}



//represents our guitar
class GuitarWorld extends VoidWorld{
	ArrayList<Fret> frets;
	ArrayList<Note> chord;
	MusicBox m = new MusicBox();
	int inst;
	Button buttons = new Button(600, 550, false);
		
	GuitarWorld(ArrayList<Fret> frets){
		this.frets = frets;
	}
	
	 public GuitarWorld initGuitar(){		 
			this.frets = new ArrayList<Fret>();	
			frets.add(new Fret(50, 5, true, new Note("E2n1"), 0));
			frets.add(new Fret(81, 5, true, new Note("A3n1"), 1));
			frets.add(new Fret(112, 5, true, new Note("D3n1"), 2));
			frets.add(new Fret(143, 5, true, new Note("G3n1"), 3));
			frets.add(new Fret(174, 5, true, new Note("B4n1"), 4));
			frets.add(new Fret(205, 5, true, new Note("E4n1"), 5));
			frets.add(new Fret(50, 40, false, new Note("F2n1"), 0));
			frets.add(new Fret(81, 40, false, new Note("A3sn1"), 1));
			frets.add(new Fret(112, 40, false, new Note("D3sn1"), 2));
			frets.add(new Fret(143, 40, false, new Note("G3sn1"), 3));
			frets.add(new Fret(174, 40, false, new Note("C4n1"), 4));
			frets.add(new Fret(205, 40, false, new Note("F4n1"), 5));
			frets.add(new Fret(50, 100, false, new Note("F2sn1"), 0));
			frets.add(new Fret(81, 100, false, new Note("B3n1"), 1));
			frets.add(new Fret(112, 100, false, new Note("E3n1"), 2));
			frets.add(new Fret(143, 100, false, new Note("A4n1"), 3));
			frets.add(new Fret(174, 100, false, new Note("C4sn1"), 4));
			frets.add(new Fret(205, 100, false, new Note("F4sn1"), 5));
			frets.add(new Fret(50, 160, false, new Note("G2n1"), 0));
			frets.add(new Fret(81, 160, false, new Note("C3n1"), 1));
			frets.add(new Fret(112, 160, false, new Note("F3n1"), 2));
			frets.add(new Fret(143, 160, false, new Note("A4sn1"), 3));
			frets.add(new Fret(174, 160, false, new Note("D4n1"), 4));
			frets.add(new Fret(205, 160, false, new Note("G4n1"), 5));
			frets.add(new Fret(50, 220, false, new Note("G2sn1"), 0));
			frets.add(new Fret(81, 220, false, new Note("C3sn1"), 1));
			frets.add(new Fret(112, 220, false, new Note("F3sn1"), 2));
			frets.add(new Fret(143, 220, false, new Note("B4n1"), 3));
			frets.add(new Fret(174, 220, false, new Note("D4sn1"), 4));
			frets.add(new Fret(205, 220, false, new Note("G4sn1"), 5));
			frets.add(new Fret(50, 280, false, new Note("A3n1"), 0));
			frets.add(new Fret(81, 280, false, new Note("D3n1"), 1));
			frets.add(new Fret(112, 280, false, new Note("G3n1"), 2));
			frets.add(new Fret(143, 280, false, new Note("C4n1"), 3));
			frets.add(new Fret(174, 280, false, new Note("E4n1"), 4));
			frets.add(new Fret(205, 280, false, new Note("A5n1"), 5));
			frets.add(new Fret(50, 340, false, new Note("A3sn1"), 0));
			frets.add(new Fret(81, 340, false, new Note("D3sn1"), 1));
			frets.add(new Fret(112, 340, false, new Note("G3sn1"), 2));
			frets.add(new Fret(143, 340, false, new Note("C4sn1"), 3));
			frets.add(new Fret(174, 340, false, new Note("F4n1"), 4));
			frets.add(new Fret(205, 340, false, new Note("A5sn1"), 5));
			frets.add(new Fret(50, 400, false, new Note("B3n1"), 0));
			frets.add(new Fret(81, 400, false, new Note("E3n1"), 1));
			frets.add(new Fret(112, 400, false, new Note("A4n1"), 2));
			frets.add(new Fret(143, 400, false, new Note("D4n1"), 3));
			frets.add(new Fret(174, 400, false, new Note("F4sn1"), 4));
			frets.add(new Fret(205, 400, false, new Note("B5n1"), 5));
			/** These lines change midi channels:
			 * 0 = Acoustic Guitar nylon
			 * 1 = Acoustic Guitar steel
			 * 2 = Electric guitar clean
			 * 3 = Electric guitar jazz */
			int[] ilist = {25, 26, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
			m.initChannels(ilist);
			this.inst = 0;
			return this;
		 }
	 
		
	 public Scene onDraw(){ 
		 
		 /** NOTES ON THE FRET STUFF:
		  * 
		  * Each fret image is in total 30 by 60
		  * Each fret is placed 30 + 1 pixels to the right to create white border
		  */
		 
		 Scene result = new EmptyScene(700, 600);
		  result = result.placeImage(new Text("Guitar Chord Player", 40, "black"), 450, 40);
		  result = result.placeImage(new Overlay (new Circle(80, "solid", "black" ), 
				  new Circle(250, "solid", "chocolate" )), 127, 600);
		  result = result.placeImage(new Rectangle(190, 400, "solid", "chocolate"), 127, 200);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 50, 500);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 81, 500);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 112, 500);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 143, 500);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 174, 500);
		  result = result.placeImage(new Rectangle(3, 200, "solid", "gray"), 205, 500);
		  result = result.placeImage(new Text("1", 30, "black"), 15, 45);
		  result = result.placeImage(new Text("2", 30, "black"), 15, 105);
		  result = result.placeImage(new Text("3", 30, "black"), 15, 165);
		  result = result.placeImage(new Text("4", 30, "black"), 15, 225);
		  result = result.placeImage(new Text("5", 30, "black"), 15, 285);
		  result = result.placeImage(new Text("6", 30, "black"), 15, 345);
		  result = result.placeImage(new Text("7", 30, "black"), 15, 405);
		  int i = 0;
		  while(i < this.frets.size()){
			 result = this.frets.get(i).drawFret(result);	 
			 i = i + 1;
		 }
		  result = this.buttons.draw(this.inst, result);
		 return result; 
	 }
	 
	 /** Sets all frets on one string to be unclicked */
	 public void emptyString(int string){
		 int i = string;
		 while(i < this.frets.size()){
			 this.frets.get(i).clicked = false;
			 
			 i = i + 6;
		 }
	 }
	 
	 /** Generates the chord from the frets selected. Works by building an ArrayList
	  * of the notes in the selected frets, then mutating the chord field. */
	 public void makeChord(){
		 ArrayList<Note> temp = new ArrayList<Note>();
		 int i = 0;
		 while(i < frets.size()){
			 if(frets.get(i).clicked == true){
				 temp.add(frets.get(i).note);
			 }
			i++; 
		 }
		chord = temp; 	 
	 }
	 
	 
	 /** Sets the tick rate for the program */
	 public double tickRate(){
		 return 0.5;
	 }
	 
	 // Detects Mouse clicks on the fretboard and toggles clicked status
	 public void onMouse(int x, int y, String event){	 
		if(event.equals("button-down")){
			int i = 0;
			while(i<frets.size()){
				if(frets.get(i).isClicked(x,y) && frets.get(i).clicked == true){
					emptyString(frets.get(i).string);
					break;
				}
				else{
					if(frets.get(i).isClicked(x,y) && frets.get(i).clicked == false){
						emptyString(frets.get(i).string);
						frets.get(i).clicked = true;
						break;
					}
				}
				i++;				
			}
		}	 
    }
	 
	 
	 /** Currently just to test what notes are playing */
	 public void onKey(String ke){
		 if(ke.equals("g")){
			 makeChord();
			 Chord c = new Chord();
			 int i = 0;
			 while(i < this.chord.size()){
				 c.addNote(this.chord.get(i));
				 i++;
			 }
			 Tune chord = new Tune(this.inst, c);
			 m.playTune(chord);
		 }
	 }
	 
}

//examples and tests for the guitar
class Examples{
	
	ArrayList<Fret> guitar = new ArrayList<Fret>();
	GuitarWorld start = new GuitarWorld(guitar).initGuitar();

	
	
	

	 VoidWorld result = start.bigBang();

	
}


