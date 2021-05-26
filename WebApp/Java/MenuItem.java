public class MenuItem {
    //variables
    private String itemName;
    private double itemPrice;

    //constructor
   public MenuItem(String itemName, double itemPrice){
       this.itemName =  itemName;
       this.itemPrice = itemPrice;
    }

    // Getters
    public String getItemName(){
        return itemName;
    }
    public double getItemPrice(){
        return itemPrice;
    }
    public String toString(){
        return itemName+ "," +itemPrice;
    }
}
